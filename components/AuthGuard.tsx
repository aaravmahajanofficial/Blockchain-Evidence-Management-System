import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types';

interface AuthGuardProps {
  children: ReactNode;
  roles?: UserRole[];
  fallbackUrl?: string;
}

export function AuthGuard({ children, roles, fallbackUrl = '/login' }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated
    const userJson = localStorage.getItem('user');
    
    if (!userJson) {
      router.push(fallbackUrl);
      return;
    }
    
    try {
      const userData = JSON.parse(userJson);
      
      // If specific roles are required, check if user has one of them
      if (roles && roles.length > 0) {
        // Handle legacy role mapping
        let userRole = userData.role;
        if (userRole === 'investigator') userRole = 'forensic_investigator';
        
        if (!roles.includes(userRole)) {
          router.push('/dashboard');
          return;
        }
      }
      
      setIsAuthorized(true);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      router.push(fallbackUrl);
    } finally {
      setIsLoading(false);
    }
  }, [router, roles, fallbackUrl]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
} 