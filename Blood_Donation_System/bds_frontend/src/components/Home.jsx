import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export function Home() {
  const [selectedType, setSelectedType]= useState('A+');
  const compatibilityInfo= {
        'A+': [' A+', ' AB+'],
        'A-': [' A+', ' A-', ' AB+', ' AB-'],
        'B+': ['  B+', ' AB+'],
        'B-': [' B+', ' B-', ' AB+', ' AB-'],
        'AB+': [' AB+'],
        'AB-': [' AB+', ' AB-'],
        'O+': [' A+', ' B+', ' AB+', ' O+'],
        'O-': ['A+', ' A-', ' B+', ' B-', ' AB+', ' AB-', ' O+', ' O-'],
     };
     const handleChange =(event) => {
        setSelectedType (event.target.value);
     }

    return (
      <>
      <Container fluid>
      <div>
        <Carousel>
      <Carousel.Item>
        <img 
            className="d-block w-100"
            src="https://eraktkosh.mohfw.gov.in/eraktkoshPortal/assets/images/Banner_test2.jpg"
            alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
            className="d-block w-100"
            src="https://pledge.mygov.in/world-blood-donorday-2022/assets/images/banner.jpg"
            alt="First slide"
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
            className="d-block w-100"
            src="https://eraktkosh.mohfw.gov.in/eraktkoshPortal/assets/images/header4.png"
            alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
     <div>
      <Card
  className="text-white border-0"
  style={{
    backgroundImage:
      "url('https://i.postimg.cc/J4dfh0x4/cells-1813410-1920.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0px",
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    position: "relative",
  }}
>
  {/* Overlay for dimming the background */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)", // change alpha for brightness
      zIndex: 1,
    }}
  ></div>

  <Card.Body
    style={{
      position: "relative",
      zIndex: 2,
      padding: "60px",
    }}
  >
    <Card.Title
      style={{
        fontSize: "2.5rem",
        fontWeight: "700",
        color: "#fff",
        marginBottom: "20px",
      }}
    >
      About Bloodtopia
    </Card.Title>

    <Card.Text
      style={{
        fontSize: "1.1rem",
        lineHeight: "1.8",
        color: "rgba(255,255,255,0.9)",
        marginBottom: "30px",
        maxWidth: "700px",
      }}
    >
      <strong>Bloodtopia</strong> Bloodtopia is a next-generation blood management ecosystem built to create a smarter, faster, and more transparent healthcare network. It empowers blood donors with easy registration and donation tracking, enables hospitals to manage their blood inventory efficiently, and helps patients access available blood units without delays. By combining automation, real-time monitoring, and user-friendly interfaces, Bloodtopia ensures that no life is lost due to the unavailability of blood. It’s not just a system — it’s a movement towards a more connected and compassionate society.
    </Card.Text>

    <Button
      variant="light"
      style={{
        color: "#b30000",
        fontWeight: "600",
        borderRadius: "8px",
        padding: "10px 25px",
      }}
    >
      Learn More
    </Button>
  </Card.Body>
</Card>

     </div>
   <section
  style={{
    border: "2px solid #dc3545",     // red border (Bootstrap danger color)
    borderRadius: "0px",            // rounded corners
    padding: "30px",                 // space inside the box
    margin: "",                  // space outside
    backgroundColor: "#fff5f5",      // subtle light red background
  }}
>
  <h2
    className="mt-4 mx-3"
    style={{
      textAlign: "center",
      fontWeight: "700",             // makes text bold
      color: "#b30000",
      letterSpacing: "1px",
    }}
  >
    Check Compatibility
  </h2>

  <div
    style={{
      display: "Flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "20px",
    }}
  >
    {Object.keys(compatibilityInfo).map((type) => (
      <Button
        key={type}
        variant="outline-danger"
        className="mx-3 my-2"
        style={{
          fontWeight: "700",          // bolder text
          borderWidth: "3px",         // thicker border
          padding: "10px 25px",       // more button padding
          fontSize: "1.5rem",
        }}
        onClick={handleChange}
        value={type}
      >
        {type}
      </Button>
    ))}
  </div>
  {selectedType && (
  <div
   style={{
            textAlign: "center",
            border: "2px solid #b30000",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#ffe6e6",
            color: "#8b0000",
            fontWeight: "600",
            fontSize: "1.8rem",
   }}>
    <p>
            <strong>{selectedType}</strong> blood can donate to:
          </p>
          <p>{compatibilityInfo[selectedType].map((type,index)=>(
            <span key={index} style={{margin:'0 8px'}}>{type}</span>
          ))}</p>

  </div>
 ) }
</section>
<section>
  
</section>

    </Container>
    </>
    )
}