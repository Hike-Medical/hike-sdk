"use client"

import type React from "react"
import Head from "next/head"

import { Constants } from "@hike/sdk"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export function CompanyDisabled() {
  const t = useTranslations()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const containerStyle: React.CSSProperties = {
    width: "100%",
    margin: "0",
    padding: isMobile ? "60px 16px" : "80px 40px",
    textAlign: "center" as const,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
  }

  const titleStyle: React.CSSProperties = {
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: isMobile ? "32px" : "38px",
    fontWeight: 500,
    color: "#1a1a1a",
    margin: "0 0 32px 0",
    lineHeight: 1.2,
    background: "linear-gradient(135deg, #495057 0%, #212529 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: isMobile ? "16px" : "18px",
    color: "#666",
    maxWidth: "500px",
    margin: isMobile ? "0 auto 36px" : "0 auto 48px",
    lineHeight: 1.6,
    fontWeight: 400,
  }

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center" as const,
    gap: "16px",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
    alignItems: "center" as const,
  }

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    padding: isMobile ? "10px 20px" : "12px 24px",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: 500,
    textDecoration: "none",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "transparent",
    color: "#555",
    transition: "all 0.2s ease",
    cursor: "pointer",
    position: "relative" as const,
    overflow: "hidden" as const,
    width: isMobile ? "100%" : "auto",
    maxWidth: isMobile ? "280px" : "none",
  }

  const [buttonHover, setButtonHover] = useState(false)

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#f5f5f5",
    borderColor: "#d0d0d0",
    color: "#333",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  }

  return (
    <>
      <Head>
        <title>Hike Medical</title>
      </Head>
      <style >{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap");
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fade-in-title {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .fade-in-description {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .fade-in-button {
          animation: fadeInUp 0.6s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
      `}</style>

      <div style={containerStyle}>
        <h1 style={titleStyle} className="fade-in-title">
          {t("shared.companyDisabled.title")}
        </h1>

        <p style={descriptionStyle} className="fade-in-description">
          {t("shared.companyDisabled.description")}
        </p>

        <div style={buttonGroupStyle} className="fade-in-button">
          <a
            href={`mailto:${Constants.HIKE_SUPPORT_EMAIL}`}
            style={buttonHover ? buttonHoverStyle : buttonStyle}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            onFocus={() => setButtonHover(true)}
            onBlur={() => setButtonHover(false)}
          >
            {Constants.HIKE_SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </>
  )
}
