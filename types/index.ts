// Role types for the system
export type UserRole = 
  | 'administrator'
  | 'forensic_investigator'
  | 'case_manager'
  | 'evidence_reviewer'
  | 'auditor';

// Feature access permissions
export type FeaturePermission = 
  | 'user_management'
  | 'system_configuration'
  | 'upload_evidence'
  | 'hash_evidence'
  | 'watermark_evidence'
  | 'view_evidence'
  | 'download_evidence'
  | 'verify_evidence'
  | 'create_cases'
  | 'manage_cases'
  | 'link_evidence_to_cases'
  | 'view_audit_trail'
  | 'view_system_metrics' 
  | 'generate_reports'
  | 'assign_investigators';

// User data structure
export interface UserData {
  name: string;
  email?: string;
  address?: string; // For wallet-based authentication
  role: UserRole;
  organization?: string;
}

// Permission matrix defining which roles have access to which features
export const PERMISSION_MATRIX: Record<UserRole, FeaturePermission[]> = {
  administrator: [
    'user_management',
    'system_configuration',
    'upload_evidence',
    'hash_evidence',
    'watermark_evidence',
    'view_evidence',
    'download_evidence',
    'verify_evidence',
    'create_cases',
    'manage_cases',
    'link_evidence_to_cases',
    'view_audit_trail',
    'view_system_metrics',
    'generate_reports',
    'assign_investigators'
  ],
  forensic_investigator: [
    'upload_evidence',
    'hash_evidence',
    'watermark_evidence',
    'view_evidence',
    'download_evidence',
    'verify_evidence',
    'link_evidence_to_cases',
    'view_audit_trail',
    'generate_reports'
  ],
  case_manager: [
    'view_evidence',
    'download_evidence',
    'verify_evidence',
    'create_cases',
    'manage_cases',
    'link_evidence_to_cases',
    'view_audit_trail',
    'generate_reports',
    'assign_investigators'
  ],
  evidence_reviewer: [
    'view_evidence',
    'download_evidence',
    'verify_evidence',
    'view_audit_trail',
    'generate_reports'
  ],
  auditor: [
    'view_evidence',
    'verify_evidence',
    'view_audit_trail',
    'view_system_metrics',
    'generate_reports'
  ]
}; 