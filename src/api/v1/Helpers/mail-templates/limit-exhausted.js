let limitExhaustedTemplate =  `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<style>
  @font-face {
    font-family: futuraBook;
    src: url("fonts/FuturaPTBook.otf");
  }
  @font-face {
    font-family: futuraDemi;
    src: url("fonts/FuturaPTDemi.otf");
  }
  img {
    max-width: 100%;
  }
  table {
    padding: 55px 60px 35px 60px;
    border: 1px solid gainsboro;
  }
  h2,
  h3,
  h4 {
    font-family: "futuraDemi", sans-serif;
  }
  p {
    font-family: "futuraBook", sans-serif;
    margin-top: 0;
  }
  span {
    font-family: "futuraBook", sans-serif;
  }
  a {
    color: #000;
  }
</style>
</head>
<body>
<table width="700" style="margin: 40px auto">
  <tr>
    <td colspan="2">
      <img
        src="https://smartslide.ai/static/emails/robot.png"
        alt="robot icon"
        style="width: 76px; height: 76px; margin-bottom: 40px"
      />
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p style="font-size: 40px; margin-top: 0; margin-bottom: 20px">
        Dear ${"username" || 'User'},
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <h2
        style="
          font-size: 60px;
          margin-top: 0;
          margin-bottom: 37px;
          line-height: 70px;
        "
      >
        Limit Exhausted
        <img
          src="https://smartslide.ai/static/emails/celebration.png"
          style="width: 48px; margin-bottom: -10px"
        /><br />your ${"subscriptionType" === 'M' ? 'monthly' : 'yearly'}<br />$${"price"} plan!
      </h2>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p style="font-size: 27px; margin-bottom: 35px">
        Get ready to create stunning presentations effortlessly using the
        power of AI
      </p>
    </td>
  </tr>
  <tr
    style="
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      display: inline-block;
      width: 100%;
      padding: 40px 0;
      margin-bottom: 32px;
    "
  >
    <td style="width: 49%; float: left">
      <span
        style="
          margin-bottom: 17px;
          font-size: 20px;
          color: #646464;
          display: block;
        "
        >PAYMENT DATE</span
      >
      <p style="font-size: 30px; margin-bottom: 20px; font-weight: 600">
        ${"paymentDate"}
      </p>
      <p style="font-size: 28px; margin: 0">${"paymentDay"}</p>
    </td>
    <td style="width: 50%; float: right">
      <span
        style="
          margin-bottom: 17px;
          font-size: 20px;
          color: #646464;
          display: block;
        "
        >NEXT RENEWAL</span
      >
      <p style="font-size: 30px; margin-bottom: 20px; font-weight: 600">
        ${"nextPaymentDate"}
      </p>
      <p style="font-size: 28px; margin: 0">${"nextPaymentDay"}</p>
    </td>
  </tr>
  <!-- <tr
    style="
      border-bottom: 1px solid #e3e3e3;
      display: inline-block;
      width: 100%;
      padding: 40px 0;
      margin-bottom: 40px;
    "
  > -->
  <!-- <td colspan="2">
      <p style="font-size: 30px; font-weight: 600">
        <strong>Payment Details</strong>&nbsp;&nbsp;<span
          style="font-weight: 400; font-size: 20px; color: #646464"
          >Card: ***62</span
        >
      </p>
    </td> -->
  <!-- <td style="width: 50%; float: left">
      <p style="font-size: 25px">Service Charge</p>
      <p style="font-size: 25px">Gst</p>
      <p style="font-size: 25px; margin: 0"><strong>You paid</strong></p>
    </td> -->
  <!-- <td style="width: 49%; float: right; text-align: right">
      <p style="font-size: 25px">
        <strong><span style="font-family: 'sans-serif'">₹</span>23</strong>
      </p>
      <p style="font-size: 25px">
        <strong
          ><span style="font-family: 'sans-serif'">₹</span>30.50</strong
        >
      </p>
      <p style="font-size: 25px; margin: 0">
        <strong
          ><span style="font-family: 'sans-serif'">₹</span>3000</strong
        >
      </p>
    </td> -->
  <!-- </tr> -->
  <tr>
    <td colspan="2">
      <p style="font-size: 20px">
        <img
          src="https://smartslide.ai/static/emails/calender.png"
          style="width: 25px; margin-right: 10px; margin-bottom: -8px"
        /><strong>Subscription Period:</strong> ${"subscriptionType" === 'M' ? 'Monthly' : 'Yearly'}
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p style="font-size: 20px">
        <img
          src="https://smartslide.ai/static/emails/renewal.png"
          style="width: 25px; margin-right: 10px; margin-bottom: -8px"
        /><strong>Renewal:</strong> Your plan will automatically renew every
        ${"subscriptionType" === 'M' ? 'month' : 'year'}.
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p style="font-size: 20px">
        <img
          src="https://smartslide.ai/static/emails/cancel.png"
          style="width: 25px; margin-right: 10px; margin-bottom: -8px"
        /><strong>Cancellation:</strong> You can cancel anytime before your
        next renewal.
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <img
        src="https://smartslide.ai/static/emails/content.gif"
        alt="smartslide template select"
        style="margin-top: 40px; margin-bottom: 50px"
      />
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <img
        src="https://smartslide.ai/static/emails/smartSlide-logo.png"
        alt="smartslide logo"
        style="width: 200px; margin-left: -5px; margin-bottom: 20px"
      />
    </td>
  </tr>
  <tr>
    <td>
      <p style="font-size: 25px; margin-bottom: 50px">
        If you have any questions or feedback,<br />
        please contact <a href="#"><strong>hello@smartslide.ai</strong></a>
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <p style="font-size: 16px">
        Update your <a href="#">email</a> preferences to choose which emails
        you<br />
        get or <a href="#">unsubscribe</a> from this type of email.
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <ul style="list-style: none; padding-left: 0; margin-bottom: 38px">
        <li style="display: inline-block; margin-right: 10px; width: 40px">
          <a
            href="https://www.instagram.com/smartslide.ai/?igshid=MmIzYWVlNDQ5Yg%3D%3D"
            target="_blank"
            ><img
              src="https://smartslide.ai/static/emails/instagram.svg"
              alt=""
          /></a>
        </li>
        <li style="display: inline-block; margin-right: 10px; width: 40px">
          <a
            href="https://www.facebook.com/people/SmartSlideai/61550224650076/?is_tour_dismissed=true"
            target="_blank"
            ><img
              src="https://smartslide.ai/static/emails/facebook.svg"
              alt=""
          /></a>
        </li>
        <!-- <li style="display: inline-block;margin-right: 10px;width: 40px;"><a href="#" target="_blank"><img src="https://smartslide.ai/static/emails/youtube.svg" alt=""></a></li> -->
        <li style="display: inline-block; margin-right: 10px; width: 40px">
          <a href="https://medium.com/@smartslide.ai" target="_blank"
            ><img
              src="https://smartslide.ai/static/emails/medium.svg"
              alt=""
          /></a>
        </li>
      </ul>
    </td>
  </tr>
  <tr
    style="border-top: 1px solid #e3e3e3; padding: 30px 0px; display: block"
  >
    <td style="width: 49%; float: left">
      <p style="margin: 0">&copy; 2023 SmartSlide.ai</p>
    </td>
    <td style="width: 50%; float: right; text-align: right">
      <p style="margin: 0">
        Crafted with love
        <img
          src="https://smartslide.ai/static/emails/heart-symbol.svg"
          alt=""
        />
        in india
        <img
          src="https://smartslide.ai/static/emails/india-flag.png"
          alt="indian flag"
          style="width: 17px; margin-bottom: -3px"
        />
      </p>
    </td>
  </tr>
</table>
</body>
</html>
`

module.exports= {
  limitExhaustedTemplate
}