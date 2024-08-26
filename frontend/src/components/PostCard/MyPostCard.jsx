import React from "react";
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";

const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+>/gi, "");
};

const MyPostCard = ({ post }) => {
  const cleanedDescription = stripHtmlTags(post?.description || "");
  const { profile } = useSelector((store) => store.user);

  return (
    <div className="post-card mb-6 p-4 bg-white rounded-lg shadow-md">
      {/* Post Image */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profile?.profileImage}
          alt="User Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{profile?.fullName}</h2>
          <p className="text-gray-600 text-sm">@{profile?.username}</p>
        </div>
      </div>
      {post?.postImage && (
        <img
          src={post?.postImage}
          alt="Post"
          className="w-full h-auto max-h-80 rounded-lg mb-4 object-cover"
        />
      )}
      {/* Post Description */}
      <p className="text-gray-800 mb-4 text-base md:text-lg lg:text-xl">
        {cleanedDescription}
      </p>
      {/* Post Actions */}
      <div className="flex items-center space-x-4 text-gray-600">
        <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition-colors duration-300">
          <FaRegComment className="w-5 h-5" />
          <span className="text-sm">{post?.comments?.length || 0}</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition-colors duration-300">
          <FaRegHeart className="w-5 h-5" />
          <span className="text-sm">{post?.likes || 0}</span>
        </div>
        <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-800 transition-colors duration-300">
          <FaRegBookmark className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
