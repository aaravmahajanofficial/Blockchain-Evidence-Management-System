import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { PermissionGuard } from './PermissionGuard';
import { FeaturePermission, UserRole } from '@/types';

interface PermissionAwareButtonProps extends ButtonProps {
  /**
   * The permission required to render this button
   */
  permission?: FeaturePermission;
  
  /**
   * The role required to render this button 
   */
  role?: UserRole;
  
  /**
   * Content to render inside the button
   */
  children: React.ReactNode;
}

/**
 * A button component that only renders if the user has the specified permission or role
 * 
 * @example
 * // Button only visible to users with "upload_evidence" permission
 * <PermissionAwareButton permission="upload_evidence">
 *   Upload Evidence
 * </PermissionAwareButton>
 * 
 * @example
 * // Button only visible to administrators
 * <PermissionAwareButton role="administrator">
 *   Manage Users
 * </PermissionAwareButton>
 */
export function PermissionAwareButton({
  permission,
  role,
  children,
  ...props
}: PermissionAwareButtonProps) {
  return (
    <PermissionGuard permission={permission} role={role}>
      <Button {...props}>
        {children}
      </Button>
    </PermissionGuard>
  );
} 