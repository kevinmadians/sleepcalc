"use client";

import { useState, useEffect, useRef } from 'react';

interface CustomTimePickerProps {
  value: string;
  onChange: (time: string) => void;
  is24Hour?: boolean;
}

const CustomTimePicker = ({ value, onChange, is24Hour = false }: CustomTimePickerProps) => {
  // Parse the initial time value or use current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return { hours, minutes };
  };
  
  const parseInitialTime = () => {
    if (value && value.includes(':')) {
      return value.split(':').map(Number);
    }
    const { hours, minutes } = getCurrentTime();
    return [hours, minutes];
  };
  
  const [initialHours, initialMinutes] = parseInitialTime();
  
  // State for each picker component
  const [selectedHour, setSelectedHour] = useState(is24Hour ? initialHours : initialHours % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState(initialMinutes);
  const [selectedPeriod, setSelectedPeriod] = useState(initialHours >= 12 ? 'PM' : 'AM');
  
  // Generate hours array (either 12-hour or 24-hour format)
  const hoursArray = is24Hour 
    ? Array.from({ length: 24 }, (_, i) => i) 
    : Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
  
  // Generate minutes array (00-59)
  const minutesArray = Array.from({ length: 60 }, (_, i) => i);
  
  // Update the parent component with new time
  useEffect(() => {
    let formattedHour = selectedHour;
    
    // Convert hour to 24-hour format for the value
    if (!is24Hour) {
      if (selectedPeriod === 'PM' && selectedHour < 12) {
        formattedHour = selectedHour + 12;
      } else if (selectedPeriod === 'AM' && selectedHour === 12) {
        formattedHour = 0;
      }
    }
    
    const timeValue = `${formattedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange(timeValue);
  }, [selectedHour, selectedMinute, selectedPeriod, is24Hour, onChange]);
  
  // Hour increment/decrement handlers
  const incrementHour = () => {
    const index = hoursArray.indexOf(selectedHour);
    const nextIndex = index < hoursArray.length - 1 ? index + 1 : 0;
    setSelectedHour(hoursArray[nextIndex]);
  };
  
  const decrementHour = () => {
    const index = hoursArray.indexOf(selectedHour);
    const prevIndex = index > 0 ? index - 1 : hoursArray.length - 1;
    setSelectedHour(hoursArray[prevIndex]);
  };
  
  // Minute increment/decrement handlers
  const incrementMinute = () => {
    const nextMinute = (selectedMinute + 1) % 60;
    setSelectedMinute(nextMinute);
  };
  
  const decrementMinute = () => {
    const prevMinute = selectedMinute > 0 ? selectedMinute - 1 : 59;
    setSelectedMinute(prevMinute);
  };
  
  // Toggle AM/PM
  const togglePeriod = () => {
    setSelectedPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#131829] rounded-xl overflow-hidden border border-blue-900/30 w-96 mx-auto"> 
        {/* Time picker container */}
        <div className="grid grid-cols-5 divide-x divide-blue-900/20">
          {/* Hours */}
          <div className="relative col-span-2">
            {/* Up button */}
            <button 
              className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors z-10"
              onClick={decrementHour}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Hour value */}
            <div className="h-32 flex items-center justify-center">
              <span className="text-white text-4xl font-semibold">
                {selectedHour}
              </span>
            </div>
            
            {/* Down button */}
            <button 
              className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors z-10"
              onClick={incrementHour}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 011.06 1.06l-7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Minutes */}
          <div className="relative col-span-2">
            {/* Up button */}
            <button 
              className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors z-10"
              onClick={decrementMinute}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Minute value */}
            <div className="h-32 flex items-center justify-center">
              <span className="text-white text-4xl font-semibold">
                {selectedMinute.toString().padStart(2, '0')}
              </span>
            </div>
            
            {/* Down button */}
            <button 
              className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors z-10"
              onClick={incrementMinute}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 011.06 1.06l-7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* AM/PM */}
          {!is24Hour && (
            <div className="col-span-1 h-32 flex flex-col items-center justify-center cursor-pointer px-2">
              <div 
                className={`w-full py-3 flex items-center justify-center rounded-lg mb-2 transition-colors ${
                  selectedPeriod === 'AM' ? 'bg-primary-600/20 text-white' : 'text-gray-500 hover:bg-primary-600/10'
                }`}
                onClick={() => setSelectedPeriod('AM')}
              >
                <span className="text-xl font-semibold">AM</span>
              </div>
              
              <div 
                className={`w-full py-3 flex items-center justify-center rounded-lg transition-colors ${
                  selectedPeriod === 'PM' ? 'bg-primary-600/20 text-white' : 'text-gray-500 hover:bg-primary-600/10'
                }`}
                onClick={() => setSelectedPeriod('PM')}
              >
                <span className="text-xl font-semibold">PM</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker; 