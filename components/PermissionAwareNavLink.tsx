import React from 'react';
import Link from 'next/link';
import { PermissionGuard } from './PermissionGuard';
import { FeaturePermission, UserRole } from '@/types';
import { LucideIcon } from 'lucide-react';

interface PermissionAwareNavLinkProps {
  /**
   * The permission required to render this navigation link
   */
  permission?: FeaturePermission;
  
  /**
   * The role required to render this navigation link
   */
  role?: UserRole;
  
  /**
   * The URL to navigate to
   */
  href: string;
  
  /**
   * Whether the link is currently active
   */
  isActive?: boolean;
  
  /**
   * Icon to display next to the text
   */
  icon?: LucideIcon;
  
  /**
   * Text to display in the link
   */
  children: React.ReactNode;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * A navigation link component that only renders if the user has the specified permission or role
 * 
 * @example
 * // Link only visible to users with "upload_evidence" permission
 * <PermissionAwareNavLink 
 *   permission="upload_evidence"
 *   href="/dashboard/upload"
 *   icon={FileUp}
 *   isActive={activeTab === "upload"}
 *   onClick={() => setActiveTab("upload")}
 * >
 *   Upload Evidence
 * </PermissionAwareNavLink>
 */
export function PermissionAwareNavLink({
  permission,
  role,
  href,
  isActive = false,
  icon: Icon,
  children,
  onClick
}: PermissionAwareNavLinkProps) {
  return (
    <PermissionGuard permission={permission} role={role}>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
          isActive ? "bg-accent" : "hover:bg-accent"
        } transition-all`}
        onClick={onClick}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-medium">{children}</span>
      </Link>
    </PermissionGuard>
  );
} 