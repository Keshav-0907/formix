

'use client';
import React, { useEffect, useRef } from 'react';
import { X, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetFormSlice } from '@/store/slice/formSlice';

const FormPublishedModal = ({ setShowPublishedModal, publishedForm }) => {
  const modalRef = useRef(null);
  const router = useRouter()
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowPublishedModal(false);
    dispatch(resetFormSlice());
    router.push('/dashboard');
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();

      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log('publishedForm', publishedForm);

  const link = `https://formix-seven.vercel.app/${publishedForm.data._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div
        ref={modalRef}
        className="relative bg-[#1c1c1c] text-white p-6 rounded-2xl w-full max-w-lg shadow-lg border border-[#2c2c2c]"
      >
        {/* Close icon */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Celebration content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">🎉 Form Published!</h2>
          <p className="text-sm text-gray-300 mb-6">
            Your form has been successfully published. Share it with the world!
          </p>

          {/* Link with copy button */}
          <div className="bg-[#2b2b2b] rounded-lg p-3 flex items-center justify-between mb-4">
            <span className="text-sm break-all">{link}</span>
            <button onClick={copyToClipboard} className='cursor-pointer'>
              <Copy className="h-5 w-5 text-gray-300 hover:text-white" />
            </button>
          </div>

          <Button onClick={handleClose} className="w-full bg-[#3b3b3b] hover:bg-[#4b4b4b] text-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormPublishedModal;
