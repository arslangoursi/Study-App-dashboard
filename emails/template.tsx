import * as React from "react";

import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Link,
  Row,
  Section,
  Text
} from "@react-email/components";

function Segment({ text }: { text: string }) {
  if (text?.includes("<button")) {
    const previousText = text.split("<button")[0];
    const nextText = text.split("</button>")[1];

    const link = text.split('action="')[1].split('">')[0];
    const linkText = text
      .split('action="')[1]
      .split('">')[1]
      .split("</button>")[0];

    return (
      <>
        <Segment text={previousText} />
        <Text
          style={{
            width: "100%",
            textAlign: "center"
          }}
        >
          <Link
            href={link}
            style={{
              ...ctaText,
              backgroundColor: "#FFD580",
              color: "rgb(102,102,102)",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
              margin: "10px 0"
            }}
          >
            {linkText}
          </Link>
        </Text>
        <Segment text={nextText} />
      </>
    );
  }

  if (text?.includes("<a href=")) {
    const previousText = text.split("<a href=")[0];
    const nextText = text.split("</a>")[1];

    const link = text.split('<a href="')[1].split('">')[0];
    const linkText = text.split('<a href="')[1].split('">')[1].split("</a>")[0];

    return (
      <>
        <Segment text={previousText} />
        <Link
          href={link}
          style={{
            ...ctaText,
            color: "#0073e6",
            textDecoration: "underline",
            padding: "0 5px"
          }}
        >
          {linkText}
        </Link>
        <Segment text={nextText} />
      </>
    );
  }

  if (text?.includes("<h1")) {
    const previousText = text.split("<h1>")[0];
    const nextText = text.split("</h1>")[1];

    const h1Text = text.split("<h1>")[1].split("</h1>")[0];

    return (
      <>
        <Segment text={previousText} />
        <Text
          style={{
            ...ctaTitle,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {h1Text}
        </Text>
        <Segment text={nextText} />
      </>
    );
  }

  return text;
}

const Template = ({
  content,
  subject
}: {
  content: string;
  subject?: string;
}) => {
  const contentSegments = content.split("\n");

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Tajawal"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900",
            format: "woff2"
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Column align="center" style={block}>
                <img
                  loading="lazy"
                  src="https://utfs.io/f/5WyNrWdR8eEcOCjaIDUJuMUseRhA3Wbr8Gy9LzpkHOCjw0cS"
                  width="130"
                  height="50"
                  alt="ZOOD"
                  style={logo}
                />
              </Column>
            </Row>
          </Section>
          <Section
            style={{
              direction: "rtl"
            }}
          >
            {contentSegments.map((segment, index) => (
              <Text style={{ ...ctaText, width: "fit-content" }}>
                <Segment key={index} text={segment} />
              </Text>
            ))}
          </Section>

          <Section>
            <Row>
              <Column align="center" style={footerIcon}>
                <img
                  loading="lazy"
                  src="https://utfs.io/f/5WyNrWdR8eEcOCjaIDUJuMUseRhA3Wbr8Gy9LzpkHOCjw0cS"
                  width="100"
                  height="30"
                  alt="ZOOD"
                  style={footerLogo}
                />
              </Column>
            </Row>
          </Section>
          <Text
            style={{
              ...footerCopyright,
              direction: "rtl"
            }}
          >
            حقوق الطبع والنشر © 2024 شركة ZOOD.
          </Text>
          <Text style={footerCopyright}>Copyright © 2024 ZOOD Inc.</Text>
        </Container>
      </Body>
    </Html>
  );
};

Template.PreviewProps = {
  content: `
<h1>مرحبًا بكم في زوروا!</h1>
<h1>لقد لاحظنا تسجيل دخول حديث إلى حساب الخاص بك.</h1>
نحن سعداء بانضمامكم إلينا.
هذا البريد الإلكتروني مخصص لاختبار النظام.
نأمل أن تستمتعوا بخدماتنا.
إذا كان لديكم أي استفسارات، لا تترددوا في الاتصال بنا.
نحن هنا لمساعدتكم في أي وقت.
شكرًا لاختياركم زوروا.
فريق الدعم لدينا متاح على مدار الساعة.
يمكنكم زيارة موقعنا لمزيد من المعلومات.
نحن نقدم أفضل الخدمات لعملائنا.
رضاكم هو أولويتنا.
<a href="https://www.zood.com">
زوروا موقعنا
</a> لمزيد من التفاصيل.
تابعونا على وسائل التواصل الاجتماعي.
نحن نقدر ملاحظاتكم واقتراحاتكم.
نعمل باستمرار على تحسين خدماتنا.
`.trim()
};

export default Template;

const main = {
  fontFamily: '"Tajawal", Helvetica, Arial',
  backgroundColor: "#161c24",
  padding: "20px 0"
};

const container = {
  margin: "0 auto",
  padding: "20px",
  width: "660px",
  maxWidth: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)"
};

const block = {
  display: "block",
  padding: "10px"
};

const logo = {
  marginBottom: "20px",
  borderRadius: "5px"
};

const ctaTitle = {
  display: "block",
  margin: "15px 0"
};

const ctaText = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#333",
  borderRadius: "5px"
};

const footerIcon = {
  display: "block",
  margin: "30px 0 10px"
};

const footerLogo = {
  borderRadius: "50%"
};

const footerCopyright = {
  margin: "10px 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)"
};
