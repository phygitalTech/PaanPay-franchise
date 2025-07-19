import React, {useState, useEffect, useRef} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {DownIcon} from '../../../icons';
import {BiUpArrow} from 'react-icons/bi';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

interface Option {
  value: string;
  label: string;
}

interface GenericSearchDropdownProps {
  name: string;
  label?: string;
  options: Option[];
  defaultOption?: string;
  disabled?: boolean;
  onChange?: (selectedOption: string) => void;
  className?: string;
  dropdownClass?: string;
  menuClass?: string;
}

const GenericSearchDropdown: React.FC<GenericSearchDropdownProps> = ({
  name,
  label,
  options,
  defaultOption = '',
  disabled = false,
  className = '',
  onChange,
  dropdownClass = '',
  menuClass = '',
}) => {
  const {control, getValues} = useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>(defaultOption);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Debounce the search term to improve performance
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  // Handle debounced search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  // Sync `searchTerm` with the selected form value
  useEffect(() => {
    if (!isOpen) {
      const currentValue = getValues(name);
      const selectedOption = options?.find(
        (option) => option.value === currentValue,
      );
      if (selectedOption) {
        setSearchTerm(selectedOption.label);
      } else {
        setSearchTerm('');
      }
    }
  }, [name, options, getValues, isOpen]);

  // Clear the label and value on input click
  const handleInputClick = (onChange: (value: string) => void) => {
    setSearchTerm(''); // Clear the input field
    onChange(''); // Reset the form value
    setIsOpen(true); // Open the dropdown
    setHighlightedIndex(-1); // Reset highlighted index
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent,
    onChange: (value: string) => void,
  ) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
          scrollToOption(next);
          return next;
        });
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
          scrollToOption(next);
          return next;
        });
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          const selected = filteredOptions[highlightedIndex];
          onChange(selected.value);
          setSearchTerm(selected.label);
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Scroll to the highlighted option
  const scrollToOption = (index: number) => {
    if (optionsRef.current && index >= 0 && index < filteredOptions.length) {
      const optionElement = optionsRef.current.children[index] as HTMLElement;
      if (optionElement) {
        optionElement.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset highlighted index when options change
  useEffect(() => {
    if (!isOpen) {
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultOption}
      render={({field: {onChange, value}}) => (
        <div className="relative" ref={dropdownRef}>
          <label className="mb-2.5 block text-black dark:text-white">
            {label}
          </label>

          <div className="relative bg-white dark:bg-form-input">
            <input
              type="text"
              placeholder={`Search ${label}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => handleInputClick(onChange)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(e) => handleKeyDown(e, onChange)}
              className="w-full rounded-md border border-stroke bg-transparent px-2 py-1 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
              aria-expanded={isOpen}
              aria-haspopup="true"
              aria-controls={`${name}-dropdown`}
              disabled={disabled}
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2">
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>

            {isOpen && (
              <div
                id={`${name}-dropdown`}
                ref={optionsRef}
                className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded border border-stroke bg-white shadow-lg dark:bg-form-input"
                role="listbox"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onMouseDown={() => {
                        onChange(option.value);
                        setSearchTerm(option.label);
                        setIsOpen(false);
                      }}
                      className={`hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer p-2 ${
                        highlightedIndex === index
                          ? 'bg-gray dark:bg-graydark'
                          : ''
                      }`}
                      role="option"
                      aria-selected={value === option.value}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 p-2">
                    No options found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default GenericSearchDropdown;
