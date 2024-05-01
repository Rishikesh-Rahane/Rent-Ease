// AdminDashboard.js

import React from "react";
import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import axios from "axios";
import "swiper/css/bundle";
import ListingItemAdmin from "../components/ListingItemAdmin";
import Footer from "../pages/Footer";

const AdminDashboard = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [listings, setListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/api/listing/get");
        setListings(res.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);
  // Function to handle deletion of a listing
  const handleDelete = (deletedListingId) => {
    setListings(listings.filter((listing) => listing._id !== deletedListingId));
  };
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <>
      <div className="absolute top-0 w-full">
        <AdminHeader />
      </div>
      <p className="flex items-center justify-center w-full h-16 mt-5 text-2xl bg-black text-yellow-50">Go.... Rent / <span className="text-yellow-400">Buy the Property !!!</span></p>
      <div className="-mt-3 bg-yellow-300">
        {/* listing results for offer, sale and rent */}

        <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto my-10">
          {offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-black">
                  Recent <span className="text-slate-500">offers</span>
                </h2>
                <Link
                  className="text-sm font-bold text-blue-800 hover:underline"
                  to={"/admin/search?offer=true"}
                >
                  Show more offers...
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItemAdmin
                    listing={listing}
                    key={listing._id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-black">
                  Recent places <span className="text-slate-500">for rent</span>
                </h2>
                <Link
                  className="text-sm font-bold text-blue-800 hover:underline"
                  to={"/admin/search?type=rent"}
                >
                  Show more places for rent...
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItemAdmin
                    listing={listing}
                    key={listing._id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
              <h2 className="text-2xl font-semibold text-black">
                  Recent places <span className="text-slate-500">for sale</span>
                </h2>
                <Link
                  className="text-sm font-bold text-blue-800 hover:underline"
                  to={"/admin/search?type=sale"}
                >
                  Show more places for sale...
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItemAdmin
                    listing={listing}
                    key={listing._id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default AdminDashboard;
