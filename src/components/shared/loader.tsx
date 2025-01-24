import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "@/utilities/images/logos/logo_AGL_rgb_Blue.png"
import { THEMES } from './themes';
import Image from 'next/image';
import { useOrganizationStore } from './storeoftheme';
interface LoaderProps {
    isLoading: boolean;

}
interface SeparateurPropos {
    width: number;
    height: number;
    color?: string;
}


const Loader: React.FC<LoaderProps> = ({ isLoading }) => {

    const { currentOrganization, getCurrentTheme } = useOrganizationStore();
    const { setCurrentOrganization } = useOrganizationStore();
    const theme = getCurrentTheme();
    const handleOrganizationSelect = (org: {
      id: string;
      name: string;
      code: keyof typeof THEMES;
      logo?: string;
    }) => {
      // Ensure the organization code is valid
      if (THEMES[org.code]) {
        setCurrentOrganization(org);
        // Additional logic like closing dropdown can be added here
      } else {
        console.error(`Invalid organization code: ${org.code}`);
      }
    };
   

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.5,
                            ease: "easeInOut"
                        }
                    }}
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                                ease: "easeOut"
                            }
                        }}
                        exit={{
                            scale: 1.2,
                            opacity: 0,
                            transition: {
                                duration: 1.5,
                                ease: "easeIn"
                            }
                        }}
                        className="w-80 h-24 md:w-80 md:h-32 lg:w-80 lg:h-40 flex items-center justify-center"
                    >
                        <div className="flex items-center space-x-3  pb-3">
                            <Image
                                src={theme.logo}
                                alt="Profile"
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <div className="flex items-center justify-center ">
                                <div style={{
                                    width: '2px',
                                    height: '0px',
                                    backgroundColor: 'black',
                                    transition: 'height 2.5s ease-in-out'

                                }}
                                    className="animate-grow"
                                />
                                <style jsx>{`
                                        @keyframes grow {
                                            from{
                                                height: 0;
                                            }
                                            to{
                                                height: 50px
                                            }
                                        }

                                        .animate-grow{
                                            animation: grow 0.6s ease-in-out forwards;
                                            animation-delay: 1s ;
                                        }

                                        `}
                                </style>


                            </div>
                            <div>
                                <h3 className="font-semibold">AFICA GLOBAL LOGISTICS</h3>
                                <p className="text-sm text-gray-500">App Registration</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;