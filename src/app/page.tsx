'use client';

import { useState, useRef } from 'react';

import Image from 'next/image';

type ProcessingMode = 'clean_lines' | 'portrait_enhanced' | 'artistic';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [coloringImage, setColoringImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingMode, setProcessingMode] = useState<ProcessingMode>('clean_lines');
  const [processingTime, setProcessingTime] = useState<number | null>(null);
   
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setColoringImage(null);
      setProcessingTime(null);
      // Read the original image to display it
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getEndpointForMode = (mode: ProcessingMode) => {
    switch (mode) {
      case 'clean_lines':
        return '/convert-clean-lines';
      case 'portrait_enhanced':
        return '/convert-portrait-enhanced';
      case 'artistic':
        return '/convert-artistic';
      default:
        return '/convert-clean-lines';
    }
  };

  const getModeDescription = (mode: ProcessingMode) => {
    switch (mode) {
      case 'clean_lines':
        return {
          title: 'Clear Lines',
          description: 'Optimal for clear shapes',
          icon: '✨'
        };
      case 'portrait_enhanced':
        return {
          title: 'Portrait+',
          description: 'Enhanced for faces',
          icon: '👤'
        };
      case 'artistic':
        return {
          title: 'Artistic',
          description: 'Creative approach',
          icon: '🎨'
        };
      default:
        return {
          title: 'Clear Lines',
          description: 'Optimal for clear shapes',
          icon: '✨'
        };
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    const startTime = Date.now();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const endpoint = getEndpointForMode(processingMode);
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error during processing');
      }

      const result = await response.json();
      
      if (result.coloring_image) {
        setColoringImage(`data:image/png;base64,${result.coloring_image}`);
        setProcessingTime(Date.now() - startTime);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!coloringImage) return;

    const link = document.createElement('a');
    link.href = coloringImage;
    link.download = `coloring-book-${processingMode}-${Date.now()}.png`;
    link.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setColoringImage(null);
    setError(null);
    setProcessingTime(null);
  };


  const handleFileUploadBtnClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-2xl flex flex-col gap-12 text-center px-4 py-8">
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-white"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-creative bg-clip-text text-transparent">
            Create Amazing Coloring Pages
          </h2>
          <p className="text-xl text-gray-500 leading-6">
            Upload any photo and watch it transform into a beautiful coloring book page using
            advanced edge detection
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {(['clean_lines', 'portrait_enhanced', 'artistic'] as ProcessingMode[]).map((mode) => {
                const modeInfo = getModeDescription(mode);
                return (
                  <button
                    key={mode}
                    onClick={() => setProcessingMode(mode)}
                    className={`bg-card font-semibold p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                      processingMode === mode
                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-2">{modeInfo.icon}</div>
                    <div className="font-bold text-lg mb-1">{modeInfo.title}</div>
                    <div className="text-sm text-gray-600">{modeInfo.description}</div>
                  </button>
                );
              })}
        </div>
        <div className="">
          <div>
            <div className="rounded-lg bg-card text-card-foreground shadow-sm border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden border-border hover:border-primary/50 hover:bg-primary/5">
              <div className="p-12 text-center flex flex-col gap-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    ref={inputRef}
                  />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-white"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Upload a photo</h3>
                <p className="text-muted-foreground mb-4">Drag & drop an image or click to browse</p>
                <div className="">
                  <button type='button' className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-gradient-creative text-primary-foreground hover:shadow-glow transform transition-all hover:scale-105 h-11 rounded-md px-8 cursor-pointer"  onClick={handleFileUploadBtnClick}>
                    Choose Image
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, WEBP up to 10MB</p>
                  </label>
              
              </div>
            </div>

            {selectedFile && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          📁 {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Processing Mode:</p>
                        <p className="text-lg font-semibold text-purple-700">
                          {getModeDescription(processingMode).icon} {getModeDescription(processingMode).title}
                        </p>
                      </div>
                    </div>
                  </div>
              )}
          </div>
                    {/* Action Buttons */}
          {selectedFile && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Converting
                  </>
                ) : (
                  <>
                    ✨ Convert Image
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                🔄 Reset
              </button>
            </div>
          )}

          {/* Processing Time */}
          {processingTime && (
            <div className="text-center mb-6">
              <div className="inline-block bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg">
                <strong>⚡ Processing Time: {processingTime}ms</strong>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 text-center">
              <strong>❌ Error:</strong> {error}
            </div>
          )}

          {/* Results */}
          {(originalImage || coloringImage) && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Original Image */}
                {originalImage && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                      📷 Display Original Image
                    </h3>
                    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={originalImage}
                        alt="Original Image"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Coloring Image */}
                {coloringImage && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                      🎨 Coloring Image ({getModeDescription(processingMode).title})
                    </h3>
                    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={coloringImage}
                        alt="Coloring Image"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <button
                      onClick={handleDownload}
                      className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      📥 Download Coloring Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full border-t border-border-50 bg-card-80 backdrop-blur-sm mt-16">
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Transform your memories into creative coloring experiences
          </p>
        </div>
      </div>
    </main>
  );
}
