import React from 'react';
import { FeaturePermission, UserRole } from '@/types';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGuardProps {
  /**
   * Permission required to render the children
   */
  permission?: FeaturePermission;
  
  /**
   * Role required to render the children
   */
  role?: UserRole;
  
  /**
   * Content to render when user has the required permission
   */
  children: React.ReactNode;
  
  /**
   * Optional fallback content to render when user doesn't have permission
   */
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders children based on user permissions
 */
export function PermissionGuard({ 
  permission, 
  role, 
  children, 
  fallback = null 
}: PermissionGuardProps) {
  const { hasPermission, hasRole, loading } = usePermissions();
  
  // While loading, don't render anything
  if (loading) return null;
  
  // Check if user has permission
  const hasAccess = (
    // If permission is specified, check it
    (permission && hasPermission(permission)) ||
    // If role is specified, check it
    (role && hasRole(role)) ||
    // If neither is specified, grant access
    (!permission && !role)
  );
  
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

/**
 * Higher-order component that wraps a component with permission guard
 */
export function withPermission<P>(
  Component: React.ComponentType<P>,
  permission?: FeaturePermission,
  role?: UserRole
) {
  return function WithPermissionComponent(props: P) {
    return (
      <PermissionGuard permission={permission} role={role}>
        <Component {...props} />
      </PermissionGuard>
    );
  };
} 