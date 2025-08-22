import { useState, useRef } from 'react';
import { Camera, User } from 'lucide-react';

const AvatarUpload = ({ 
  initialImage = null, 
  onImageChange 
}: {
  initialImage?: string | null;
  onImageChange?: (file: File | null, imageUrl: string | null) => void;
}) => {
  const [avatarImage, setAvatarImage] = useState<string | null>(initialImage);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (optional - limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setAvatarImage(imageUrl);
        
        // Call parent component's callback if provided
        if (onImageChange) {
          onImageChange(file, imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAvatarImage(null);
    if (onImageChange) {
      onImageChange(null, null);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div
        className="relative h-16 w-16 sm:h-10 sm:w-10 rounded-full overflow-hidden cursor-pointer self-center sm:self-auto group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={triggerFileInput}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        {avatarImage ? (
          // Display uploaded image
          <>
            <img
              src={avatarImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}>
              <Camera className="h-4 w-4 text-white" />
            </div>
            
            {/* Remove button (visible on hover) */}
            {isHovering && (
              <button
                onClick={removeImage}
                className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            )}
          </>
        ) : (
          // Display placeholder when no image
          <div className="w-full h-full bg-secondary hover:bg-secondary/80 text-white flex items-center justify-center transition-colors">
            {isHovering ? (
              <Camera className="h-4 w-4" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
      
      {/* Optional: Add text guidance */}
      <div className="text-center sm:text-left">
        <p className="text-sm text-gray-600">Click to upload avatar</p>
        <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
      </div>
    </div>
  );
};

// Usage example in your component:
const ProfileSection = () => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const handleAvatarChange = (file: File | null, imageUrl: string | null) => {
    console.log('New avatar file:', file);
    console.log('Image URL:', imageUrl);
    setUserAvatar(imageUrl);
    
    // Here you can upload the file to your server
    // uploadAvatarToServer(file);
  };

  return (
    <AvatarUpload 
      initialImage={userAvatar}
      onImageChange={handleAvatarChange}
    />
  );
};

export default AvatarUpload;