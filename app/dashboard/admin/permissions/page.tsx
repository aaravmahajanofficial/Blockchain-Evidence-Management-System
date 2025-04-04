"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PERMISSION_MATRIX, FeaturePermission, UserRole } from "@/types"
import { usePermissions } from "@/hooks/usePermissions"

// Helper function to convert permission ID to a display name
const getPermissionDisplayName = (permission: FeaturePermission): string => {
  return permission
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to convert role ID to a display name
const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case "administrator": return "Administrator";
    case "forensic_investigator": return "Forensic Investigator";
    case "case_manager": return "Case Manager";
    case "evidence_reviewer": return "Evidence Reviewer";
    case "auditor": return "Auditor";
    default: return role;
  }
};

export default function PermissionsPage() {
  const router = useRouter();
  const { hasRole, loading } = usePermissions();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // All permissions to display in the matrix
  const allPermissions: FeaturePermission[] = [
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
    'generate_reports'
  ];

  // All roles to display in the matrix
  const allRoles: UserRole[] = [
    'administrator',
    'forensic_investigator',
    'case_manager',
    'evidence_reviewer',
    'auditor'
  ];
  
  // Check if user is authorized to view this page
  useEffect(() => {
    if (!loading) {
      const authorized = hasRole('administrator');
      setIsAuthorized(authorized);
      
      if (!authorized) {
        router.push('/dashboard');
      }
    }
  }, [loading, hasRole, router]);
  
  if (loading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-12 w-12 rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Role Permissions Matrix</h1>
        <p className="text-muted-foreground">Defines access control for each role in the system</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Permissions Matrix</CardTitle>
          <CardDescription>A visual representation of which roles have access to which features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Feature/Access</th>
                  {allRoles.map(role => (
                    <th key={role} className="border p-2 text-center whitespace-nowrap">
                      {getRoleDisplayName(role)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allPermissions.map(permission => (
                  <tr key={permission} className="hover:bg-muted/50">
                    <td className="border p-2 font-medium">{getPermissionDisplayName(permission)}</td>
                    {allRoles.map(role => {
                      const hasPermission = PERMISSION_MATRIX[role]?.includes(permission);
                      return (
                        <td key={`${role}-${permission}`} className="border p-2 text-center">
                          {hasPermission ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 