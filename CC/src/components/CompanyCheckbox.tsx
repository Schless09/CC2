import { CompanyCheckboxProps } from '@/lib/types';

const CompanyCheckbox = ({
  company,
  index,
  handleCheckboxChange,
}: CompanyCheckboxProps) => {
  return (
    <div>
      <input
        type='checkbox'
        name={company.label}
        checked={company.checked}
        onChange={() => handleCheckboxChange(index)}
      />
      <label className='text-gray-300 ml-2'>{company.label}</label>
    </div>
  );
};

export default CompanyCheckbox;
