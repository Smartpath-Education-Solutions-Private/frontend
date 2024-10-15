import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, image }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img src={image} alt={author} className="w-12 h-12 rounded-full mr-4" />
        <p className="font-semibold">{author}</p>
      </div>
      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  );
};

export default TestimonialCard;