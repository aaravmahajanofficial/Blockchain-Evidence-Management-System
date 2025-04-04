# Blockchain Evidence Management System

A secure digital evidence management system using blockchain technology for law enforcement, digital forensics teams, and legal professionals to maintain the integrity and chain of custody of digital evidence.

## Features

- **Secure Evidence Storage**: Store evidence with cryptographic verification and blockchain attestation
- **IPFS Integration**: Decentralized storage using IPFS (InterPlanetary File System)
- **Blockchain Verification**: Every piece of evidence is hashed and recorded on the blockchain
- **Role-Based Access Control**: Different permissions for investigators, case managers, reviewers, and auditors
- **Chain of Custody Tracking**: Complete audit trail of all evidence access and handling
- **Evidence Verification**: Proof of authenticity and integrity for all digital evidence
- **Case Management**: Organize evidence by cases and investigations
- **User Management**: Admin controls for managing users and permissions

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: JWT-based authentication (demonstration only)
- **Storage**: IPFS for decentralized file storage
- **Blockchain**: Ethereum (simulated for the demonstration)

## Role-Based Access

The system provides five different user roles:

1. **Administrator** - Full system access and user management
2. **Forensic Investigator** - Upload, hash, and manage evidence
3. **Case Manager** - Create and manage cases, link evidence to cases
4. **Evidence Reviewer** - View and verify evidence
5. **Auditor** - Verify evidence and view audit trails

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blockchain-evidence-management-system.git
cd blockchain-evidence-management-system
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

Use the following credentials to test the system:

- **Administrator**: admin@example.com / admin123
- **Forensic Investigator**: investigator@example.com / invest123
- **Case Manager**: casemanager@example.com / case123
- **Evidence Reviewer**: reviewer@example.com / review123
- **Auditor**: auditor@example.com / audit123

## Project Structure

```
blockchain-evidence-management-system/
├── app/                  # Next.js app directory
│   ├── dashboard/        # Dashboard and role-specific views
│   ├── login/            # Authentication pages
│   ├── profile/          # User profile management
│   ├── register/         # User registration
│   ├── settings/         # Application settings
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript type definitions
```

## Notes

This is a demonstration project. In a production environment, you would need to:

1. Implement a proper backend with database storage
2. Set up real blockchain integration (Ethereum, Polygon, etc.)
3. Configure real IPFS nodes or use a service like Pinata or Infura
4. Implement proper authentication with JWT/OAuth
5. Add comprehensive error handling and validation
6. Create proper API endpoints for all operations

## License

MIT