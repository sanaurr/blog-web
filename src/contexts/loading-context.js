'use client';
import { createContext, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
const LoadingContext = createContext();
function LoadingProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setIsLoading
            }}
        >
             {isLoading && (
                <Box 
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 9999
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {children}
        </LoadingContext.Provider>
    );
}

export {LoadingContext, LoadingProvider}