
import { useRouter } from 'next/router';
import Link from 'next/link';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import React from 'react';



const Breadcrumbs = ({ currentTab = '' }) => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(p => p);
  // Ajoutez le nom de l'onglet actuel aux miettes de pain
  let updatedSegments = pathSegments;

  // Vérifiez si l'onglet actuel est déjà présent dans les miettes de pain
  const isCurrentTabInPath = currentTab && pathSegments.includes(currentTab);

  // Si l'onglet actuel n'est pas déjà dans les miettes de pain, ajoutez-le
  if (!isCurrentTabInPath && currentTab) {
    updatedSegments = [...pathSegments, currentTab];
  }
  
  return (
    <nav aria-label="breadcrumb" style={{ textAlign: 'left', marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}>
     
      {updatedSegments.map((segment, index) => {
        const href = '/' + updatedSegments.slice(0, index + 1).join('/');
        const isLastSegment = index === updatedSegments.length - 1;
        //const hasPreviousSegment = index > 0;
        const linkStyle = {
          color: index === updatedSegments.length - 1 ? '#1b365f' : 'blue',
          marginRight: '5px',
          textDecoration: 'none',
        };

        return isLastSegment ? (
            <>
            {/* {''}{hasPreviousSegment && <ChevronRightTwoToneIcon />} {''} */}
          <span key={segment} style={{ ...linkStyle, fontWeight: 'bold', fontSize: '1em' }}>{segment}</span>
          </>
        ) : (
          <Link href={href} key={segment}>
            {segment}
            {<ChevronRightTwoToneIcon />}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
