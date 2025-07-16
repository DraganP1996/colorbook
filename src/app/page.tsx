export default function Home() {
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
          <div className="rounded-lg border bg-card text-card-600 shadow-sm p-6 text-center border-border-50 transition-all flex flex-col gap-2">
            <div className="bg-primary-10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
            </div>
            <h3 className="font-semibold">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload your favorite photos
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-600 shadow-sm p-6 text-center border-border-50 transition-all flex flex-col gap-2">
            <div className="bg-primary-10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
            </div>
            <h3 className="font-semibold">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload your favorite photos
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-600 shadow-sm p-6 text-center border-border-50 transition-all flex flex-col gap-2">
            <div className="bg-primary-10 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
            </div>
            <h3 className="font-semibold">Easy Upload</h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload your favorite photos
            </p>
          </div>
        </div>
        <div className="rounded-lg bg-card text-card-foreground shadow-sm border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden border-border hover:border-primary/50 hover:bg-primary/5">
          <div className="p-12 text-center flex flex-col gap-2">
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
              <button className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-gradient-creative text-primary-foreground hover:shadow-glow transform transition-all hover:scale-105 h-11 rounded-md px-8">
                Choose Image
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, WEBP up to 10MB</p>
          </div>
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
