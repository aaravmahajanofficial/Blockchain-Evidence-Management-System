import { useEffect, useState } from 'react';
import { FeaturePermission, PERMISSION_MATRIX, UserData, UserRole } from '@/types';

export function usePermissions() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Convert legacy role names to match new type format
        if (parsedUser.role === 'investigator') {
          parsedUser.role = 'forensic_investigator';
        }
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    setLoading(false);
  }, []);

  /**
   * Check if the current user has a specific permission
   */
  const hasPermission = (permission: FeaturePermission): boolean => {
    if (!currentUser) return false;
    
    const userRole = currentUser.role as UserRole;
    const permissions = PERMISSION_MATRIX[userRole] || [];
    
    return permissions.includes(permission);
  };

  /**
   * Check if the current user has a specific role
   */
  const hasRole = (role: UserRole): boolean => {
    if (!currentUser) return false;
    
    // Map legacy role names to new format for comparison
    const userRole = currentUser.role;
    
    // Handle specific legacy mappings
    if (role === 'forensic_investigator' && userRole === 'investigator') {
      return true;
    }
    
    return userRole === role;
  };

  /**
   * Get all permissions for the current user
   */
  const getUserPermissions = (): FeaturePermission[] => {
    if (!currentUser) return [];
    
    const userRole = currentUser.role as UserRole;
    return PERMISSION_MATRIX[userRole] || [];
  };

  return {
    currentUser,
    loading,
    hasPermission,
    hasRole,
    getUserPermissions
  };
} 