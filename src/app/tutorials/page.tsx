'use client';

import { useState } from 'react';
import { FiPlay, FiYoutube, FiExternalLink, FiStar, FiAward } from 'react-icons/fi';
import Link from 'next/link';

const TutorialSection = () => {
  const [activeTab, setActiveTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // Enhanced video data with beautiful thumbnails
  const videoResources = {
    beginner: [
      {
        id: 1,
        title: 'How to Start a Blog in 2023 - Step by Step Guide',
        channel: 'Blogging Mastery',
        url: 'https://www.youtube.com/watch?v=Q8rN3JKqUc8',
        thumbnail: 'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '12:45',
        rating: 4.8
      },
      {
        id: 2,
        title: 'Blogging for Complete Beginners - Zero to Hero',
        channel: 'Digital Creators',
        url: 'https://www.youtube.com/watch?v=KS633xAXbA4',
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '18:30',
        rating: 4.9
      },
      {
        id: 3,
        title: 'Writing Your First Blog Post - Pro Tips & Tricks',
        channel: 'Content King',
        url: 'https://www.youtube.com/watch?v=OQDvKf-27vs',
        thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '15:22',
        rating: 4.7
      },
      {
        id: 4,
        title: 'Best Free Blogging Platforms Compared',
        channel: 'Tech Savvy',
        url: 'https://www.youtube.com/watch?v=1GYNBYuWt4I',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '22:10',
        rating: 4.6
      }
    ],
    intermediate: [
      {
        id: 5,
        title: '10X Your Blog Traffic - Advanced Strategies',
        channel: 'Traffic Titans',
        url: 'https://www.youtube.com/watch?v=ZI8Zx2FmAy8',
        thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '28:45',
        rating: 4.9
      },
      {
        id: 6,
        title: 'SEO Masterclass for Bloggers - Rank #1 on Google',
        channel: 'SEO Wizards',
        url: 'https://www.youtube.com/watch?v=0fKg7d37gQE',
        thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '35:18',
        rating: 5.0
      },
      {
        id: 7,
        title: 'Monetization Secrets - $10k/Month from Blogging',
        channel: 'Profit Pioneers',
        url: 'https://www.youtube.com/watch?v=8vQhqjNaC5Y',
        thumbnail: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '25:40',
        rating: 4.8
      },
      {
        id: 8,
        title: 'Content Strategy That Gets 1M Views/Month',
        channel: 'Viral Vision',
        url: 'https://www.youtube.com/watch?v=wet92ucvG3s',
        thumbnail: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '19:55',
        rating: 4.7
      }
    ],
    advanced: [
      {
        id: 9,
        title: 'Advanced Blogging - Industry Secrets Revealed',
        channel: 'Pro Bloggers',
        url: 'https://www.youtube.com/watch?v=ALeD71ZzJmY',
        thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '42:15',
        rating: 4.9
      },
      {
        id: 10,
        title: 'Building a Blogging Empire - $100k/Month Blueprint',
        channel: 'Entrepreneur Elite',
        url: 'https://www.youtube.com/watch?v=5CQJ9DlVCU4',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '38:20',
        rating: 5.0
      },
      {
        id: 11,
        title: 'Email List Building - Convert Readers to Customers',
        channel: 'Conversion Kings',
        url: 'https://www.youtube.com/watch?v=0qo7EFB7JYo',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '31:45',
        rating: 4.8
      },
      {
        id: 12,
        title: 'WordPress Customization - Make Your Blog Unique',
        channel: 'WP Experts',
        url: 'https://www.youtube.com/watch?v=8AZ8GqW5iak',
        thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=450',
        duration: '27:10',
        rating: 4.7
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 px-6 py-3 rounded-full mb-6">
          {/* <FiRocket className="mr-2 text-blue-600 dark:text-blue-300" /> */}
          <span className="font-medium text-blue-600 dark:text-blue-300">Blogging Resources</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Master Blogging With Our Video Guides</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Handpicked collection of the best blogging tutorials from across the web
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 shadow-inner">
          <button
            onClick={() => setActiveTab('beginner')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${activeTab === 'beginner' ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <FiStar className="mr-2" />
            Beginner
          </button>
          <button
            onClick={() => setActiveTab('intermediate')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${activeTab === 'intermediate' ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <FiAward className="mr-2" />
            Intermediate
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${activeTab === 'advanced' ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            {/* <FiRocket className="mr-2" /> */}
            Advanced
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {videoResources[activeTab].map((video) => (
          <div key={video.id} className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {/* Video Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">{video.duration}</span>
              </div>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <FiPlay className="text-white text-2xl ml-1" />
                </div>
              </a>
            </div>
            
            {/* Video Info */}
            <div className="p-5">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(video.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-2">{video.rating}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{video.channel}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                <FiYoutube className="mr-2" />
                Watch Now
                <FiExternalLink className="ml-1 text-sm" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Blogging Journey?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Get personalized blog post ideas and writing assistance from our AI assistant
          </p>
          <Link href={'/chatbot'}>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center shadow-lg hover:shadow-xl">
            {/* <FiRocket className="mr-2" /> */}
            Generate Blog Ideas Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialSection;