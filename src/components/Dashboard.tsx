import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [content, setContent] = useState<any>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loogedInUser, setLoggedInUser] = useState<string | null>(null);

  const identifier = 'dashboard-content';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'https://precious-veil-tuna.cyclic.cloud/api/username'
        );
        setLoggedInUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();

    const fetchContent = async () => {
      try {
        const response = await axios.get(
          `https://precious-veil-tuna.cyclic.cloud/api/content/${identifier}`
        );
        setContent(response.data || {});
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent((prevContent: React.SetStateAction<any>) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSaveItemContent = async (itemName: string) => {
    try {
      // Include the identifier and the specific item's content when saving/updating
      await axios.post('https://precious-veil-tuna.cyclic.cloud/api/content', {
        identifier,
        [itemName]: content[itemName],
      });
      setMessage('Content saved successfully!');
    } catch (error) {
      setMessage('Failed to save content.');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        {loogedInUser && <p className="text-xl mb-4">Welcome {loogedInUser}</p>}
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Hero Title:</h3>
        <input
          type="text"
          name="heroTitle"
          value={content.heroTitle || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleSaveItemContent('heroTitle')}
        >
          Save Hero Title
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Hero Navitems (comma-separated):</h3>
        <input
          type="text"
          name="heroNavitems"
          value={content.heroNavitems ? content.heroNavitems.join(', ') : ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleSaveItemContent('heroNavitems')}
        >
          Save Hero Navitems
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Hero Button Text:</h3>
        <input
          type="text"
          name="heroButtonText"
          value={content.heroButtonText || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleSaveItemContent('heroButtonText')}
        >
          Save Hero Button Text
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl mb-2">Hero Text Color:</h3>
        <input
          type="text"
          name="heroTextColor"
          value={content.heroTextColor || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => handleSaveItemContent('heroTextColor')}
        >
          Save Hero Text Color
        </button>
      </div>

      {/* Add input fields and save buttons for other content fields as needed */}

      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};

export default Dashboard;
