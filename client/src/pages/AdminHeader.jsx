import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import "./css/adminHeader.css";

export default function AdminHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/admin/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='fixed w-full bg-black shadow-md'>
      <div className='flex items-center justify-between max-w-6xl p-3 mx-auto'>
        <Link to='/admin/dashboard'>
          <h1 className='flex flex-wrap text-sm font-bold sm:text-xl'>
            <span className='text-yellow-50 '>Rent</span>
            <span className='text-yellow-400'>Ease</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='flex items-center p-3 rounded-lg bg-slate-100'
        >
          <input
            type='text'
            placeholder='Search...'
            className='w-24 text-gray-500 bg-transparent focus:outline-none sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
        <Link to='/admin/dashboard/complaint'>
            <li className='hidden text-yellow-50 sm:inline hover:underline'>
              Compl<span className='text-yellow-400'>aints</span>
            </li>
          </Link>
          <Link to='/admin/dashboard'>
            <li className='hidden sm:inline text-yellow-50 hover:underline'>
              Ho<span className='text-yellow-400'>me</span>
            </li>
          </Link>
          <Link to='/admin/dashboard/profile'>
            {currentUser ? (
              <img
                className='object-cover rounded-full h-7 w-7'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
