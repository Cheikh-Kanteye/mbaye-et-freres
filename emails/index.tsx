import React from "react";
import {
  Container,
  Html,
  Link,
  Heading,
  Text,
  Img,
  Hr,
} from "@react-email/components";

const containerStyle = {
  backgroundColor: "#FFFFFF",
  color: "#dc2626",
  fontFamily:
    'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif',
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "0.15008px",
  lineHeight: "1.5",
  margin: "0",
  padding: "32px 0",
  minHeight: "100%",
  width: "100%",
};

const innerContainerStyle = {
  margin: "0 auto",
  maxWidth: "600px",
  backgroundColor: "#FFFFFF",
};

const imageStyle = {
  height: "32px",
  outline: "none",
  border: "none",
  textDecoration: "none",
  verticalAlign: "middle",
  display: "inline-block",
  maxWidth: "100%",
};

const headingStyle = {
  fontWeight: "bold",
  margin: "0",
  fontSize: "24px",
  padding: "16px 24px 0px 24px",
};

const textStyle = {
  fontSize: "16px",
  fontWeight: "normal",
  padding: "16px 24px",
};

const profileContainerStyle = {
  backgroundColor: "#f8f8f8",
  padding: "24px 16px",
};

const profileImageStyle = {
  outline: "none",
  border: "none",
  textDecoration: "none",
  height: "64px",
  width: "64px",
  maxWidth: "100%",
  display: "inline-block",
  verticalAlign: "middle",
  borderRadius: "64px",
};

const buttonStyle = {
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#dc2626",
  borderRadius: "4px",
  display: "inline-block",
  padding: "16px 32px",
  textDecoration: "none",
};

const hrStyle = {
  width: "100%",
  border: "none",
  borderTop: "1px solid #EEEEEE",
  margin: "0",
};

const Email: React.FC<{ email: string; name: string; message: string }> = ({
  email,
  name,
  message,
}) => (
  <Html>
    <Container style={containerStyle}>
      <Container style={innerContainerStyle}>
        <Container style={{ textAlign: "left", padding: 24 }}>
          <Img
            src="https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_RAFATLGe3CN1wDsb/birdhouse.png"
            alt=""
            height="32"
            style={imageStyle}
          />
        </Container>
        <Heading style={headingStyle}>Hello, {name}!</Heading>
        <Text style={textStyle}>{message}</Text>
        <Container style={{ padding: "8px 24px" }}>
          <Container style={profileContainerStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Img
                src={`https://ui-avatars.com/api/?size=128&name=${encodeURIComponent(
                  name
                )}`}
                alt={name}
                height="64"
                width="64"
                style={profileImageStyle}
              />
              <Container style={{ paddingLeft: "8px" }}>
                <Heading
                  style={{ fontSize: "20px", margin: "0", fontWeight: "bold" }}
                >
                  {name}
                </Heading>
                <Text
                  style={{ color: "#dc2626", fontSize: "14px", margin: "0" }}
                >
                  Email: {email}
                </Text>
              </Container>
            </div>
          </Container>
        </Container>
        <Container style={{ padding: "16px 24px", textAlign: "left" }}>
          <Link
            href="https://cheikhkanteye.vercel.app/"
            style={buttonStyle}
            target="_blank"
          >
            Visiter le site
          </Link>
        </Container>
        <Container style={{ padding: "16px 24px" }}>
          <Hr style={hrStyle} />
        </Container>
      </Container>
    </Container>
  </Html>
);

export default Email;
