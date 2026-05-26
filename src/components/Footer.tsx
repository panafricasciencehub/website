'use client'

export function Footer() {
  const aiTools = [

  ]

  return (
    <footer className="relative py-20 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-12">
          {/* Logo and Description */}
          <div className="col-span-12 md:col-span-4">
            <div>
              <div className="font-montserrat text-background text-3xl tracking-wider mb-4">
                pash
              </div>
              <p className="text-background/70 leading-relaxed mb-6">
                Pan African Science Hub is a technology-driven organization.
              </p>
              {/* Social Media Icons */}
              <div className="flex items-center space-x-6">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61582734914339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/pan-african-science-hub-604b862b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/pash91625?igsh=YzljYTk1ODg3Zg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#833AB4" />
                        <stop offset="50%" stopColor="#E1306C" />
                        <stop offset="100%" stopColor="#F56040" />
                      </linearGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@panafricansciencehubug?si=abtFHAGo_bstNCy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 gentle-animation cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Tools We Use Section */}
          <div className="col-span-12 md:col-span-8">
            <div>
              <h4 className="font-black text-2xl text-background mb-4"></h4>

              {/* AI Tools Description */}
              <p className="text-background/70 text-base mb-8 leading-relaxed">
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {aiTools.map((tool, index) => (
                  <div
                    key={tool}
                    className="text-background/80 hover:text-background gentle-animation text-sm font-medium"
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Simplified */}
        <div className="border-t border-background/20 pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-background/70 mb-4 md:mb-0 flex items-center gap-4">
              <span>© 2025 pash. All rights reserved.</span>
              <a href="/articles" className="hover:text-background transition">Articles</a>
            </div>
            <div className="text-sm text-background/70">
              Kampala, Uganda / Bhavanagar, Gujarat, India
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
