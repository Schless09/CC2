import z from 'zod';
import { jobApplicationSchema, shareJobSchema } from '../schemas';

export interface ReferralSelectorProps {
  onSubmit: (values: any) => any;
  isLoading: boolean;
  setFiles: (files: File[]) => void;
  includeLinkedin?: boolean;
  includeCompany?: boolean;
}

export interface ClientReferralEmailMessageProps {
  emailFirstName: string;
  userFirstName: string;
  userLastName: string;
  emailCompany?: string;
}

export interface JobOpeningEmailMessageProps {
  emailFirstName: string;
  userFirstName: string;
  userLastName: string;
  jobId?: string;
  jobTitle?: string;
}

export interface ReferralEmailMessageProps {
  emailFirstName: string;
  userFirstName: string;
  userLastName: string;
}

export interface FileUploadFieldProps {
  control: any;
  setFiles: (files: File[]) => void;
  title: string;
  error?: string;
  name?: string;
  disabled?: boolean; // Add this line
}

export interface ModalStateProps {
  isOpen: boolean;
  currentJobId?: string | null;
  currentJobTitle?: string | null;
  onOpen: (jobId: string, jobTitle: string) => void;
  onClose: () => void;
}

export interface JobOpening {
  _id: string;
  title: string;
  company: string;
  companyWebsite: string;
  companySize: string;
  companyFunding: string;
  companyIndustry: string;
  companyLinkedin: string;
    description: string;
  targetCompensation: number;
  equity: {
    offered: boolean;
    percentage: number;
  };
  equityHigh: {
    offered: boolean;
    percentage: number;
  };
  bonus: {
    offered: boolean;
    percentage: number;
  };
  city: string;
  state: string;
  keywords: string;
  jobType: string;
  workArrangement: string;
  geoUrn: string;
  pastCompanies: string[];
  key1: string;
  key2: string;
  key3: string;
  referrals: string[];
  status: 'contacted' | 'interviewing' | 'successful' | 'inactive';
  hiringManager: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShareModalFormProps {
  onSubmit: (values: z.infer<typeof shareJobSchema>) => void;
  isLoading: boolean;
}

export interface JobApplicationModalFormProps {
  onSubmit: (values: z.infer<typeof jobApplicationSchema>) => void;
  isLoading: boolean;
  setFiles: (files: File[]) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId?: string;
  jobTitle?: string;
  user?: any;
}

export interface JobCardProps {
  jobData: JobOpening;
  userData: any;
  addHoverEffects?: boolean;
}

export interface JobDetailProps {
  user: any;
  jobOpening: JobOpening;
}

export interface ReferralStatusEmailMsgProps {
  userFirstName: string;
  referralFirstName: string;
  referralLastName: string;
  oldStatus?: string;
  newStatus: string;
  // isCandidateReferral?: boolean;
}

export interface UpdateReferralProps {
  referralId?: string;
  email?: string;
  data: any;
  isUpdated?: boolean;
}

export interface ReferralStatusEmailProps extends ReferralStatusEmailMsgProps {
  userEmail: string;
  subject: string;
}

export interface PastCompany {
  label: string;

  checked: boolean;
}

export interface CompanyCheckboxProps {
  company: PastCompany;
  index: number;
  handleCheckboxChange: (value: number) => void;
}

export interface ILinkedInUrl {
  geoUrn: string;
  keywords: string;
  pastCompanies: string[];
}

export type PastCompaniesIdsMapType = {
  [key: string]: string;
};

export type Referral = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status:
    | 'Contacted'
    | 'Active'
    | 'Interviewing'
    | 'Hired'
    | 'Referral Paid Out'
    | 'Inactive';
  createdAt: string;
};

export type ClientReferral = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status:
    | 'Contacted'
    | 'Engaged'
    | 'Interviewing CoA Candidates'
    | 'Hired CoA Candidate'
    | 'Referral Paid Out'
    | 'Search Closed - Unsuccessful';
  createdAt: string;
};

export enum JobPostingStatuses {
  CONTACTED = 'contacted',
  INTERVIEWING = 'interviewing',
  SUCCESSFUL = 'successful',
  INACTIVE = 'inactive',
}

export enum ReferralStatuses {
  CONTACTED = 'Contacted',
  ACTIVE = 'Active',
  INTERVIEWING = 'Interviewing',
  HIRED = 'Hired',
  INACTIVE = 'Inactive',
  REFERRAL_PAID_OUT = 'Referral Paid Out',
}

export enum ClientReferralStatuses {
  CONTACTED = 'Contacted',
  ENGAGED = 'Engaged',
  INTERVIEWING_CANDIDATES = 'Interviewing CoA Candidates',
  HIRED_CANDIDATE = 'Hired CoA Candidate',
  REFERRAL_PAID_OUT = 'Referral Paid Out',
  SEARCH_CLOSED = 'Search Closed - Unsuccessful',
}

export interface LoaderProps {
  isSmall?: boolean;
  customHeight?: string;
}

export interface DropdownMenuProps {
  rowId: string;
  currentStatus: string;
  handleClick: (
    rowId: string,
    currentStatus: string,
    newStatus: string
  ) => void;
  statuses:
    | typeof JobPostingStatuses
    | typeof ReferralStatuses
    | typeof ClientReferralStatuses;
}

export type ActiveStateLabel =
  | 'Users'
  | 'Job Openings'
  | 'Referrals'
  | 'Client Referrals';

  export enum ActivityType {
    NEW_USER_CREATED = 'New User Created',
    USER_DELETED = 'User Deleted',
    REFERRAL_STATUS_CHANGED = 'Referral Status Changed',
    CLIENT_REFERRAL_STATUS_CHANGED = 'Client Referral Status Changed',
    REFERRAL_UPDATED = 'Referral Updated',
    CLIENT_REFERRAL_UPDATED = 'Client Referral Updated',
    NEW_JOB_OPENING = 'New Job Opening',
    NEW_REFERRAL = 'New Referral',
    CLIENT_INTRODUCTION = 'Client Introduction',
    JOB_POSTING_STATUS_CHANGED = 'Job Posting Status Changed',
  }
  

