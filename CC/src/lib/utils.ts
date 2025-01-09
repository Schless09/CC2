import { pastCompaniesIdsMap } from '@/app/constants';
import { toast } from '@/components/ui/use-toast';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  ClientReferralEmailMessageProps,
  ILinkedInUrl,
  JobOpening,
  JobOpeningEmailMessageProps,
  PastCompany,
  ReferralEmailMessageProps,
  ReferralStatusEmailMsgProps,
} from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates the description of a job opening if it exceeds 500 characters.
 * @param desc - The description to truncate.
 * @returns The truncated description.
 */
export const truncateDescription = (desc: string) => {
  return desc.length > 500 ? `${desc.substring(0, 500)}...` : desc;
};

export const parseDate = (value: string) =>
  new Date(value).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

/**
 * Copies the job details to the clipboard.
 * @param job - The job opening details.
 */
export const copyJobDetailsToClipboard = (
  job: JobOpening,
  userId?: string | null
) => {
  let jobLink = `https://thecodercollective.com/openings/${job._id}`;
  if (userId) {
    jobLink += `?ref=${userId}`;
  }
  // Modify the link to include the user's ID
  const jobDetails = `Check out this job opening: ${job.title}\nLearn more at: ${jobLink}`;
  navigator.clipboard
    .writeText(jobDetails)
    .then(() => toast({ title: 'Job details copied to clipboard!' }))
    .catch((err) => console.error('Error copying text: ', err));
};

export const clientReferralEmailMessage = ({
  emailFirstName,
  userFirstName,
  userLastName,
  emailCompany,
}: ClientReferralEmailMessageProps) => {
  const msg =
  // `<div>
  //     <p>
  //       Hi ${emailFirstName} - ${userFirstName} ${userLastName} (CC'd) provided your contact info and suggested we connect. 
  //     </p>
  //     <p>
  //     At our core, Coder Collective is a recruitment firm. What makes us unique is our ability to harness the potential of 
  //     expansive networks. Thanks to the efforts of indivdisual like ${userFirstName}, to utilize their personal and professional networks, 
  //     aiding us in forging meaningful relationships.
  //     </p>
  //     <p>
  //     Specializing in the direct hire placement of top-tier SWE professionals, we'd welcome the opportunity to not only meet, but exceed your hiring requirements.
  //     </p>
  //     <p>
  //       Full disclosure, ${userFirstName} receives a referral bonus if you end up
  //       hiring someone through our services.
  //     </p>
    
  //     <p>
  //       We exclusively conduct contingent searches, ensuring our services are tailored to meet your specific needs. To get started, please feel free to reach out directly or 
  //       <a href='https://thecodercollective.com/hiring-manager' target='_blank' rel='noopener noreferrer' class='text-blue-700 underline'>visit our website</a> 
  //       and schedule time to discuss your hiring objectives.
  //     </p>
  //     <p>Best regards,</p>
      
  //     <span style="display: block;">Andrew Schuessler</span>
  //     <span style="display: block;">Coder Collective</span>
  //     <span style="display: block;">
  //     847-609-4515 | Connect w/ me on  
  //     <a href='https://www.linkedin.com/in/andrew-schuessler-18965559/' 
  //     target='_blank' rel='noopener noreferrer' class='text-blue-700 underline'>LinkedIn</a> 
  //     </span>
  //     <span style="display: block;">andrew@thecodercollective.com</span>
  //   </div>`;
  `<div>
  <p>
    Hi ${emailFirstName},  
    ${userFirstName} ${userLastName} (CC'd) recently shared your contact information and suggested we connect.
  </p>
  <p>
    Coder Collective is a San Francisco-based recruitment firm specializing in direct hire placements for top-tier software engineers. Through connections with individuals like ${userFirstName}, we foster relationships that lead to successful hiring outcomes.
  </p>
    <p>
   We work exclusively on a contingent basis and tailor our efforts to meet your needs. Feel free to reach out directly or  
    <a href="https://thecodercollective.com/hiring-manager" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">visit our website</a> 
    to schedule a time to discuss your hiring goals.
  </p>
  <p>
    Full disclosure: ${userFirstName} receives a referral bonus if ${emailCompany} hires through our services.
  </p>
  <p>Best regards,</p>
  <p style="margin: 0; font-weight: bold;">Andrew Schuessler</p>
  <p style="margin: 0;">Coder Collective</p>
  <p style="margin: 0;">
    847-609-4515 | Connect with me on  
    <a href="https://www.linkedin.com/in/andrew-schuessler-18965559/" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">LinkedIn</a>
  </p>
  <p style="margin: 0;">andrew@thecodercollective.com</p>
</div>
`
  return msg;
};

export const jobOpeningEmailMessage = ({
  emailFirstName,
  userFirstName,
  userLastName,
  jobId,
  jobTitle,
}: JobOpeningEmailMessageProps) => {
  const msg = `<div>
    <p>
      Hi ${emailFirstName} - ${userFirstName} ${userLastName} (CC'd) provided us your contact details and suggested you might be interested in one of the 
      <a href=https://thecodercollective.com/openings/${jobId} target='_blank' class='text-blue-700 underline'>
      ${jobTitle}</a> roles we're currently looking to fill.
    </p>
    <p>
      Please review the job posting and <a href="https://cal.com/andrew-schuessler-xrp0oa/20" target="_blank" className="text-blue-700 underline">schedule time to chat</a> at your convenience.
    </p>

    <p>
      At our core, Coder Collective is a recruitment firm. What makes us unique is our ability to harness the potential of 
      expansive networks. Our approach empowers the everyday Accountant to utilize their personal and professional networks, 
      aiding us in forging meaningful relationships.
    </p>
    <p>
      Full disclosure, ${userFirstName} receives a referral bonus if you end up being hired 
      through one of our clients.
    </p>
    <p>Best regards,</p> 
      
      <span style="display: block;">Andrew Schuessler</span>
      <span style="display: block;">Coder Collective</span>
      <span style="display: block;">
      847-609-4515 | Connect w/ me on  
      <a href='https://www.linkedin.com/in/andrew-schuessler-18965559/' 
      target='_blank' rel='noopener noreferrer' class='text-blue-700 underline'>LinkedIn</a> 
      </span>
      <span style="display: block;">andrew@thecodercollective.com</span>
    </div> 
    `;
  return msg;
};

export const referralEmailMessage = ({
  emailFirstName,
  userFirstName,
  userLastName,
}: ReferralEmailMessageProps) => {
  const msg = `
  <div>
    <p>
      Hi ${emailFirstName} - ${userFirstName} ${userLastName} (CC'd) provided us 
      your contact information and suggested you might be a fit for one of the roles we're 
      currently looking to fill.
    </p>
     <p>
    At <a href="https://thecodercollective.com" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">Coder Collective</a>, we leverage the power of our expansive networks to connect with outstanding talent. Thanks to contributions from engineers like ${userFirstName}, we continue to foster meaningful relationships within the tech community, creating opportunities that benefit everyone involved.
  </p>
    <p>
      I’d love to learn more about your professional background and career goals. Please 
      <a href="https://cal.com/andrew-schuessler-xrp0oa/20" target="_blank" className="text-blue-700 underline">schedule time to chat</a> at your earliest convenience.
    </p>
     <p>
    Just a heads-up: ${userFirstName} will receive a referral bonus if you're hired through one of our clients.
  </p>
    <p>Best regards,</p>
    <span style="display: block;">Andrew Schuessler</span>
    <span style="display: block;">Coder Collective</span>
    <span style="display: block;">
    847-609-4515 | Connect w/ me on 
    <a href='https://www.linkedin.com/in/andrew-schuessler-18965559/'
    target='_blank' rel='noopener noreferrer' class='text-blue-700 underline'>LinkedIn</a>
    </span>
    <span style="display: block;">andrew@thecodercollective.com</span>
  </div>
`;
  return msg;
};

export const referralStatusEmailMessage = ({
  userFirstName,
  referralFirstName,
  referralLastName,
  oldStatus,
  newStatus,
}: ReferralStatusEmailMsgProps) => {
  const statusMessage = oldStatus
    ? `from "${oldStatus}" to "${newStatus}"`
    : `to "${newStatus}"`;
  const msg = `
  <div>
    <p>
      Hi ${userFirstName} - ${referralFirstName} ${referralLastName}&apos;s status has been changed ${statusMessage}.
    </p>
    
    <p>You can view the latest updates and track each of your referrals by visiting your <a href='https://theCoder Collective.com/dashboard/' target='_blank' rel="noopener noreferrer" class='text-blue-700 underline'>dashboard</a>.</p>
   
    <p>
      Know someone else who could benefit from connecting with Coder Collective? You’re welcome to submit additional candidate referrals or client introductions! Simply visit our 
      <a href="https://www.theCoderCollective.com/referrals" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">Candidate Referrals</a> page or 
      <a href="https://www.theCoderCollective.com/introClient" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline">Client Introduction</a> page to get started. Both links provide an easy step-by-step process.
    </p>
   
    <p>If you have any questions or need assistance, please don't hesitate to reach out to us.</p>
   
    <p>Thanks,</p>
    <p>The Coder Collective team</p>
  </div>
`;
  return msg;
};

export const transformGeoUrn = (geoUrn: string) => {
  return `["${geoUrn}"]`;
};

export const transformKeywords = (keywords: string) => {
  return keywords.replace(/, /g, ' OR ');
};

export const constructLinkedInUrl = ({
  geoUrn,
  keywords,
  pastCompanies,
}: ILinkedInUrl): string => {
  const encodedGeoUrn = encodeURIComponent(geoUrn);
  const network = '["F"]';
  const encodedNetwork = encodeURIComponent(network);

  let linkedInUrlParams = `geoUrn=${encodedGeoUrn}&network=${encodedNetwork}&origin=GLOBAL_SEARCH_HEADER`;

  if (keywords) {
    const encodedKeywords = encodeURIComponent(keywords);
    linkedInUrlParams += `&keywords=${encodedKeywords}&titleFreeText=${encodedKeywords}`;
  }

  if (pastCompanies) {
    const pastCompaniesIds = pastCompanies.map(
      (company) => pastCompaniesIdsMap[company]
    );
    const encodedPastCompaniesIds = encodeURIComponent(
      JSON.stringify(pastCompaniesIds)
    );
    linkedInUrlParams += `&pastCompany=${encodedPastCompaniesIds}`;
  }

  const linkedInUrl = `https://www.linkedin.com/search/results/people/?${linkedInUrlParams}`;
  return linkedInUrl;
};

export const getPastCompaniesLabels = (pastCompanies: PastCompany[]) => {
  return pastCompanies
    .filter((company) => company.checked)
    .map((company) => company.label);
};

export const getTimeAgo = (timestamp: Date): string => {
  const now = new Date();
  const secondsPast = Math.floor(
    (now.getTime() - new Date(timestamp).getTime()) / 1000
  );

  if (secondsPast < 60) {
    return `${secondsPast} seconds ago`;
  }
  if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (secondsPast < 2592000) {
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (secondsPast < 31536000) {
    const months = Math.floor(secondsPast / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(secondsPast / 31536000);
  return `${years} year${years > 1 ? 's' : ''} ago`;
};


export const formatPhoneNumber = (value: string): string => {
  if (!value) return value;

  // Remove all non-digits
  const phoneNumber = value.replace(/[^\d]/g, '');

  // Format as (xxx) xxx-xxxx
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};