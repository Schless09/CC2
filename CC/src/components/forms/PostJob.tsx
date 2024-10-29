'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  industries,
  pastCompanies as companies,
  states,
  geos,
  workArrangement,
  jobTypes,
} from '@/app/constants';
import Loader from '../Loader';
import {
  getPastCompaniesLabels,
  transformGeoUrn,
  transformKeywords,
} from '@/lib/utils';
import CompanyCheckbox from '../CompanyCheckbox';
import { motion } from 'framer-motion';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  options?: string[] | { label: string; value: string }[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  placeholder = '',
  options = [],
}) => (
  <div className='mb-6'>
    <label
      className='block text-sm font-medium text-gray-700 mb-2'
      htmlFor={name}
    >
      {label}
    </label>
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition duration-200 text-gray-900'
      >
        <option value=''>Select {label}</option>
        {options.map(
          (
            option: string | { label: string; value: string },
            index: number
          ) => (
            <option
              key={index}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          )
        )}
      </select>
    ) : (
      <input
        className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition duration-200 text-gray-900'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    )}
  </div>
);

interface Company {
  label: string;
  checked: boolean;
}

const PostJob: React.FC<{ author: string }> = ({ author }) => {
  const [company, setCompany] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySize, setCompanySize] = useState('---');
  const [companyFunding, setCompanyFunding] = useState('---');
  const [companyIndustry, setCompanyIndustry] = useState('---');
  const [companyLinkedin, setCompanyLinkedin] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetCompensation, setTargetCompensation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [keywords, setKeywords] = useState('');
  const [geoUrn, setGeoUrn] = useState('');
  const [workType, setWorkType] = useState('');
  const [jobType, setJobType] = useState('');
  const [bonus, setBonus] = useState('');
  const [equityLow, setEquityLow] = useState('');
  const [equityHigh, setEquityHigh] = useState('');
  const [pastCompanies, setPastCompanies] = useState<Company[]>(companies);
  const [isLoading, setIsLoading] = useState(false);
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [key3, setKey3] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      company,
      companyWebsite,
      companySize,
      companyFunding,
      companyIndustry,
      companyLinkedin,
      title,
      description,
      targetCompensation,
      city,
      state,
      keywords: transformKeywords(keywords),
      geoUrn: transformGeoUrn(geoUrn),
      workArrangement: workType,
      jobType,
      bonus: bonus ? { offered: true, percentage: parseFloat(bonus) } : { offered: false, percentage: 0 },
      equity: equityLow
        ? { offered: true, percentage: parseFloat(equityLow) }
        : { offered: false, percentage: 0 },
      equityHigh: equityHigh
        ? { offered: true, percentage: parseFloat(equityHigh) }
        : { offered: false, percentage: 0 },
      pastCompanies: getPastCompaniesLabels(pastCompanies),
      createdBy: author,
      key1,
      key2,
      key3,
    };

    try {
      const response = await fetch('/api/jobposting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Job Posting successful!');
        router.push('/openings');
      } else {
        console.error('Job Posting failed.');
      }
    } catch (error) {
      console.error('Error submitting job posting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const newPastCompanies = [...pastCompanies];
    newPastCompanies[index].checked = !newPastCompanies[index].checked;
    setPastCompanies(newPastCompanies);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case 'company':
        setCompany(value);
        break;
      case 'companyWebsite':
        setCompanyWebsite(value);
        break;
      case 'companySize':
        setCompanySize(value);
        break;
      case 'companyFunding':
        setCompanyFunding(value);
        break;
      case 'companyIndustry':
        setCompanyIndustry(value);
        break;
      case 'companyLinkedin':
        setCompanyLinkedin(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'targetCompensation':
        setTargetCompensation(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'keywords':
        setKeywords(value);
        break;
      case 'geoUrn':
        setGeoUrn(value);
        break;
      case 'workType':
        setWorkType(value);
        break;
      case 'jobType':
        setJobType(value);
        break;
      case 'bonus':
        setBonus(value);
        break;
      case 'equityLow':
        setEquityLow(value);
        break;
      case 'equityHigh':
        setEquityHigh(value);
        break;
      case 'key1':
        setKey1(value);
        break;
      case 'key2':
        setKey2(value);
        break;
      case 'key3':
        setKey3(value);
        break;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden'
      >
        <div className='px-6 py-8 sm:p-10'>
          <h1 className='text-3xl font-extrabold text-center text-gray-900 mb-2'>
            Submit Job Posting
          </h1>
          <p className='text-center text-gray-600 mb-8'>
            Fill in the details of the job position to find the perfect
            candidate.
          </p>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2'>
              <InputField
                label='Company Name'
                type='text'
                name='company'
                value={company}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='Company Website'
                type='text'
                name='companyWebsite'
                value={companyWebsite}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='Company LinkedIn'
                type='text'
                name='companyLinkedin'
                value={companyLinkedin}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='Company Size'
                type='select'
                name='companySize'
                value={companySize}
                onChange={handleInputChange}
                required
                options={[
                  '1-50',
                  '51-200',
                  '201-500',
                  '501-1000',
                  '1001-2500',
                  '2501-5000',
                  '5001+',
                ]}
              />
              <InputField
                label='Company Funding'
                type='select'
                name='companyFunding'
                value={companyFunding}
                onChange={handleInputChange}
                required
                options={[
                  'Pre-Seed',
                  'Seed',
                  'Series A',
                  'Series B',
                  'Series C',
                  'Series D',
                  'Series E',
                  'Publicly Traded',
                  'Privately Funded'
                ]}
              />
              <InputField
                label='Industry'
                type='select'
                name='companyIndustry'
                value={companyIndustry}
                onChange={handleInputChange}
                required
                options={industries}
              />
              <InputField
                label='Job Title'
                type='text'
                name='title'
                value={title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='col-span-full'>
              <label
                className='block text-sm font-medium text-gray-700 mb-2'
                htmlFor='description'
              >
                Job Description
              </label>
              <textarea
                className='w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition duration-200 text-gray-900'
                name='description'
                value={description}
                onChange={handleInputChange}
                required
                rows={6}
              />
            </div>

            <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2'>
              <InputField
                label='Target Compensation'
                type='number'
                name='targetCompensation'
                value={targetCompensation}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='City'
                type='text'
                name='city'
                value={city}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='State'
                type='select'
                name='state'
                value={state}
                onChange={handleInputChange}
                required
                options={states}
              />
              <InputField
                label='Keywords'
                type='text'
                name='keywords'
                value={keywords}
                onChange={handleInputChange}
                placeholder='e.g. Engineer, Software'
              />
              <InputField
                label='Geo'
                type='select'
                name='geoUrn'
                value={geoUrn}
                onChange={handleInputChange}
                required
                options={geos}
              />
              <InputField
                label='Work Arrangement'
                type='select'
                name='workType'
                value={workType}
                onChange={handleInputChange}
                required
                options={workArrangement}
              />
              <InputField
                label='Job Type'
                type='select'
                name='jobType'
                value={jobType}
                onChange={handleInputChange}
                required
                options={jobTypes}
              />
              <InputField
                label='Bonus %'
                type='text'
                name='bonus'
                value={bonus}
                onChange={handleInputChange}
                placeholder='e.g. 10'
              />
              <InputField
                label='Equity (Low) %'
                type='text'
                name='equityLow'
                value={equityLow}
                onChange={handleInputChange}
                placeholder='e.g. 0.1'
              />
              <InputField
                label='Equity (High) %'
                type='text'
                name='equityHigh'
                value={equityHigh}
                onChange={handleInputChange}
                placeholder='e.g. 1.0'
              />
            </div>

            <div className='col-span-full'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Past Companies
              </label>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {pastCompanies.map((company, index) => (
                  <CompanyCheckbox
                    key={company.label}
                    company={company}
                    index={index}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3'>
              <InputField
                label='Key Hiring Criteria 1'
                type='text'
                name='key1'
                value={key1}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='Key Hiring Criteria 2'
                type='text'
                name='key2'
                value={key2}
                onChange={handleInputChange}
                required
              />
              <InputField
                label='Key Hiring Criteria 3'
                type='text'
                name='key3'
                value={key3}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className='pt-5'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader isSmall />
                    <span className='ml-2'>Submitting...</span>
                  </>
                ) : (
                  'Submit Job Posting'
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJob;