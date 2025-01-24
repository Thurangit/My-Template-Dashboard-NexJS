import React, { useState, useCallback } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';

// Types
interface FileStatus {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface OneDriveUploadSession {
  uploadUrl: string;
  expirationDateTime: string;
}

const MAX_CHUNK_SIZE = 1024 * 1024 * 4; // 4MB chunks for OneDrive

const FileUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    void handleFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      void handleFiles(selectedFiles);
    }
  }, []);

  // Obtenir le token d'accès OneDrive
  const getOneDriveToken = async (): Promise<string> => {
    try {
      const response = await fetch('/api/onedrive-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to get OneDrive token');
      }
      
      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      throw new Error('Error getting OneDrive access token');
    }
  };

  // Créer une session d'upload OneDrive
  const createUploadSession = async (
    file: File,
    accessToken: string
  ): Promise<OneDriveUploadSession> => {
    const endpoint = `https://graph.microsoft.com/v1.0/me/drive/items/${file.name}:/createUploadSession`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: {
            '@microsoft.graph.conflictBehavior': 'rename',
            name: file.name,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create upload session');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Error creating upload session');
    }
  };

  // Upload un chunk de fichier
  const uploadChunk = async (
    chunk: Blob,
    start: number,
    total: number,
    uploadUrl: string
  ): Promise<Response> => {
    const end = start + chunk.size - 1;
    
    return fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Length': `${chunk.size}`,
        'Content-Range': `bytes ${start}-${end}/${total}`,
      },
      body: chunk,
    });
  };

  // Upload un fichier large en chunks
  const uploadLargeFile = async (
    file: File,
    uploadUrl: string,
    onProgress: (progress: number) => void
  ): Promise<void> => {
    const fileSize = file.size;
    let start = 0;

    while (start < fileSize) {
      const end = Math.min(start + MAX_CHUNK_SIZE, fileSize);
      const chunk = file.slice(start, end);

      const response = await uploadChunk(chunk, start, fileSize, uploadUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to upload chunk: ${response.statusText}`);
      }

      start = end;
      const progress = (start / fileSize) * 100;
      onProgress(progress);
    }
  };

  // Gérer l'upload des fichiers
  const handleFiles = async (newFiles: File[]): Promise<void> => {
    setIsUploading(true);
    setGlobalError(null);

    // Initialiser les statuts des fichiers
    const initialStatuses: FileStatus[] = newFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending'
    }));
    setFileStatuses(initialStatuses);

    try {
      const accessToken = await getOneDriveToken();

      // Upload chaque fichier
      for (const [index, file] of newFiles.entries()) {
        try {
          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { ...status, status: 'uploading' } : status
          ));

          const uploadSession = await createUploadSession(file, accessToken);

          await uploadLargeFile(
            file,
            uploadSession.uploadUrl,
            (progress) => {
              setFileStatuses(prev => prev.map((status, i) => 
                i === index ? { ...status, progress } : status
              ));
            }
          );

          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { ...status, status: 'success', progress: 100 } : status
          ));
        } catch (error) {
          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { ...status, status: 'error', error: (error as Error).message } : status
          ));
        }
      }
    } catch (error) {
      setGlobalError((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusColor = (status: FileStatus['status']): string => {
    switch (status) {
      case 'success':
        return 'bg-green-100 border-green-200';
      case 'error':
        return 'bg-red-100 border-red-200';
      case 'uploading':
        return 'bg-blue-100 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } hover:border-blue-500`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">
            Glissez-déposez vos fichiers ici
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            ou cliquez pour sélectionner des fichiers
          </p>
        </div>

        {fileStatuses.length > 0 && (
          <div className="mt-4 space-y-2">
            {fileStatuses.map((fileStatus, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-2 rounded border ${getStatusColor(fileStatus.status)}`}
              >
                <span className="text-sm truncate flex-1">
                  {fileStatus.file.name}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {(fileStatus.file.size / 1024).toFixed(1)} KB
                </span>
                {fileStatus.status === 'uploading' && (
                  <div className="ml-4 w-24">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${fileStatus.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {fileStatus.status === 'success' && (
                  <CheckCircle className="ml-4 h-4 w-4 text-green-500" />
                )}
                {fileStatus.status === 'error' && (
                  <X className="ml-4 h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </div>
        )}

        {globalError && (
        //   <Alert className="mt-4 bg-red-50 border-red-200">
        //     <X className="h-4 w-4 text-red-500" />
        //     <AlertDescription>
        //       Erreur: {globalError}
        //     </AlertDescription>
        //   </Alert>
        <div></div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;