// utils/bugFixes.ts
export const commonBugFixes = {
  // Fix for React Router navigation issues
  navigationFixes: `
    // In App.tsx, ensure all routes are properly defined
    <Route path="/order-tracking/:id" element={<OrderTracking />} />
    <Route path="/review/:orderId" element={<ReviewRating />} />
    <Route path="/edit-service/:id" element={<EditService />} />
    
    // Use navigate function properly
    const navigate = useNavigate();
    navigate('/path', { state: { data } }); // For passing data
    navigate(-1); // For going back
  `,

  // Fix for form state management
  formStateFixes: `
    // Use proper state management for forms
    const [formData, setFormData] = useState(initialState);
    
    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // Reset form after submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Submit logic...
      setFormData(initialState); // Reset form
    };
  `,

  // Fix for image upload issues
  imageUploadFixes: `
    // Handle multiple image uploads
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      
      const newImages = Array.from(files).slice(0, 5 - images.length);
      setImages(prev => [...prev, ...newImages]);
      
      // Create previews
      newImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    };
  `,

  // Fix for mobile responsiveness
  mobileResponsiveFixes: `
    // Use mobile-first CSS
    .container {
      @apply w-full px-4;
      @apply sm:px-6;
      @apply lg:px-8;
      @apply xl:max-w-7xl xl:mx-auto;
    }
    
    // Ensure touch-friendly buttons
    .btn {
      @apply min-h-[44px] min-w-[44px];
      @apply flex items-center justify-center;
    }
  `
};