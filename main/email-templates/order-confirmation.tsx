import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Column } from "@react-email/column";
import { Head } from "@react-email/head";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Row } from "@react-email/row";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";
import { Heading } from "@react-email/heading";
import {
  BaseDomain,
  BrandName,
  Email,
  OurAddress,
  PhoneNumber,
} from "@/constants";

const baseUrl = BaseDomain;

export default function OrderConfirmationEmail(
  name: any,
  products: any,
  total: any,
  address: any,
  tracking: any,
  seller: any,
  order: any,
  date: any,
  shipping: any,
  discount: any
) {
  return (
    <Html>
      <Head />
      <Preview>
        Get your order summary, estimated delivery date and more
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={track.container}>
            <Row>
              <Column>
                <Img
                  src="https://isomorphic-furyroad.vercel.app/logo.svg"
                  alt=" logo"
                  style={{
                    margin: "0",
                  }}
                />
              </Column>
              <Column align="right">
                <Text style={global.paragraphWithBold}>
                  {tracking?.have ? "Tracking" : "Order "}Number
                </Text>
                <Text style={track.number}> {tracking?.id}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={message}>
            {tracking?.have ? (
              <Link
                href={`${baseUrl}/order-tracking/${tracking?.id}`}
                style={global.button}
              >
                Track Package
              </Link>
            ) : (
              <Link
                href={`${baseUrl}/order/${tracking?.id}`}
                style={global.button}
              >
                View Order
              </Link>
            )}
            <Heading style={{ ...global.heading, marginTop: 24 }}>
              You order&apos;s is on its way
            </Heading>
            <Text style={global.text}>
              Use the link above to track its progress.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={adressTitle}>Shipping to: {name}</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>{address}</Text>
          </Section>
          <Hr style={global.hr} />
          <Section>
            <Row style={orderTHead}>
              <Column>
                <Text style={{ margin: 0, ...tableCell }}>Item</Text>
              </Column>
              <Column align="right">
                <Text style={tableCell}>Quantity</Text>
              </Column>
              <Column align="right">
                <Text style={tableCell}>Price</Text>
              </Column>
            </Row>
            {products?.map((product: any) => (
              <Row key={product.id} style={itemRow}>
                <Column>
                  <Img
                    style={{ borderRadius: 6 }}
                    src={product.image}
                    width="48"
                    height="48"
                  />
                </Column>
                <Column>
                  <Text style={tableCell}>{product.name}</Text>
                </Column>
                <Column align="center">
                  <Text style={tableCell}>{product.quantity}</Text>
                </Column>
                <Column align="right">
                  <Text style={tableCell}>₹{product.price}</Text>
                </Column>
              </Row>
            ))}
          </Section>
          {/* <Hr style={global.hr} /> */}
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Order Number</Text>
                <Text style={track.number}>{order}</Text>
              </Column>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Order Date</Text>
                <Text style={track.number}>{date}</Text>
              </Column>
            </Row>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Shipping</Text>
                <Text style={track.number}>₹{shipping}</Text>
              </Column>
              <Column style={{ width: "170px" }}>
                <Text style={global.paragraphWithBold}>Discount</Text>
                <Text style={track.number}>₹{discount}</Text>
              </Column>
              <Column>
                <Text style={global.paragraphWithBold}>Total</Text>
                <Text style={track.number}>₹{total}</Text>
              </Column>
            </Row>
            <Row>
              <Column align="center">
                <Link href={`${baseUrl}/${seller}`} style={global.button}>
                  Visit Seller Again
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={menu.container}>
            <Text style={menu.title}>Get Help</Text>
            <Row style={menu.content}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href={`${baseUrl}/become-a-seller`} style={menu.text}>
                  Become a Seller
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href={`${baseUrl}/contact-us`} style={menu.text}>
                  Contact Us
                </Link>
              </Column>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href={`${baseUrl}/comparison`} style={menu.text}>
                  Compare our Platform
                </Link>
              </Column>
            </Row>
            <Row style={{ ...menu.content, paddingTop: "0" }}>
              <Column style={{ width: "33%" }} colSpan={1}>
                <Link href={`${baseUrl}/refer-earn`} style={menu.text}>
                  Refer & Earn
                </Link>
              </Column>
              <Column style={{ width: "66%" }} colSpan={2}>
                <Link href={`${baseUrl}/faqs`} style={menu.text}>
                  {"FAQ's"}
                </Link>
              </Column>
            </Row>
            <Hr style={global.hr} />
            <Row style={menu.tel}>
              <Column>
                <Row>
                  <Column style={{ width: "16px" }}>
                    {/* <PiDeviceMobileLight
                      style={{
                        width: '16px',
                        height: '16px',
                        marginRight: '8px',
                      }}
                    /> */}
                  </Column>
                  <Column>
                    <Text style={{ ...menu.text, marginBottom: "0" }}>
                      {PhoneNumber}
                    </Text>
                  </Column>
                </Row>
              </Column>
              <Column>
                <Row>
                  <Column style={{ width: "16px" }}>
                    {/* <PiClock
                      style={{
                        width: '16px',
                        height: '16px',
                        marginRight: '8px',
                      }}
                    /> */}
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...menu.text,
                        marginBottom: "0",
                      }}
                    >
                      {Email}
                    </Text>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section style={paddingY}>
            <Img
              src="https://isomorphic-furyroad.vercel.app/logo.svg"
              alt=" logo"
              style={{
                margin: "12px auto 36px",
              }}
            />
            {/* <Row style={categories.container}>
              <Column align="center">
                <Link href={baseUrl} style={categories.text}>
                  Men
                </Link>
              </Column>
              <Column align="center">
                <Link href={baseUrl} style={categories.text}>
                  Women
                </Link>
              </Column>
              <Column align="center">
                <Link href={baseUrl} style={categories.text}>
                  Kids
                </Link>
              </Column>
              <Column align="center">
                <Link href={baseUrl} style={categories.text}>
                  Customize
                </Link>
              </Column>
            </Row> */}
          </Section>
          <Hr style={{ ...global.hr, marginTop: "12px" }} />
          <Section
            style={{ ...paddingY, paddingLeft: "12px", paddingRight: "12px" }}
          >
            <Row style={footer.policy}>
              <Column>
                <Link href={baseUrl} style={footer.link}>
                  Visit Our Site
                </Link>
              </Column>
              <Column>
                <Link
                  href={`${baseUrl}/policies/privacy&poilicy`}
                  style={footer.link}
                >
                  Privacy Policy
                </Link>
              </Column>
            </Row>
            <Text style={{ ...footer.text, paddingTop: 16, paddingBottom: 16 }}>
              Please contact us if you have any questions.
            </Text>
            <Text style={footer.text}>
              © {new Date().getFullYear()} {BrandName}, Inc. All Rights
              Reserved.
            </Text>
            <Text style={footer.text}>
              {BrandName}, INC. {OurAddress}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "28px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#111",
    fontSize: "16px",
    border: 0,
    borderRadius: 6,
    textDecoration: "none",
    padding: "14px 24px",
    display: "inline-block",
    textAlign: "center",
    fontWeight: 500,
    color: "#fff",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  border: "1px solid #E5E5E5",
  borderRadius: 6,
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const recomendationsText = {
  margin: "0",
  fontSize: "15px",
  lineHeight: "1",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const recomendations = {
  container: {
    padding: "20px 0",
  },
  product: {
    verticalAlign: "top",
    textAlign: "left" as const,
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  title: { ...recomendationsText, paddingTop: "12px", fontWeight: "500" },
  text: {
    ...recomendationsText,
    paddingTop: "4px",
    color: "#747474",
  },
};

const menu = {
  container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
  },
  content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
  },
  tel: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "32px",
    paddingBottom: "22px",
  },
};

const orderTHead = {
  paddingLeft: "20px",
  paddingRight: "20px",
  marginBottom: "8px",
  // borderRadius: '6px',
  backgroundColor: "#F3F4F6",
};
const tableCell = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#111827",
};
const itemRow = {
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "12px",
  marginBottom: "12px",
  borderBottomWidth: 1,
  borderColor: "#E5E7EB",
  borderStyle: "solid",
};
const priceTitleCell = {
  paddingRight: "16px",
  margin: 0,
  width: "100%",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#374151",
};
const priceCell = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: 500,
  color: "#111827",
};
const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
  link: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
    textDecoration: "underline",
  } as React.CSSProperties,
};
