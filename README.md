<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This project shows an example of how to build an automated Voice Notification fallback for failed Twilio SMS messages. For users who are unable to receive SMS messages using a phone call to deliver the message and provide businesses with a way to connect with their customers. Leveraging Answering Machine Detection and high quality text to speech models also allows users to leverage visual voicemail to receive the intended message.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

In order to test out this project you will need to open a Twilio Account and purchase at least one Twilio Phone Number. 

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Twilio CLI
  ```sh
  brew tap twilio/brew && brew install twilio
  twilio login
  ```


### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/mdvickst/voice-notifications
   ```
3. Deploy to Twilio Serverless using the CLI
   ```sh
   cd voice-notifications
   twilio serverless:deploy
   ```
4. Create Twilio Event Sink using the Function domain created in the previous step
   ```sh
   twilio api:events:v1:sinks:create --description "SMS Undelivered Sink" \
--sink-configuration '{"destination":""https://${function_domain}/eventStreamWebhook"","method":"POST","batch_events":false}' \
--sink-type webhook
   ```
5. Create Event Streams Susbcription using the Sink SID from the previous ttep
   ```sh
   twilio api:events:v1:subscriptions:create \
  --description "Subscription to SMS undelivered events" \
  --sink-sid <sink id validated above DGxxx> \
  --types '{"type":"com.twilio.messaging.message.undelivered","schema_version":3}' 
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Call the sendSMS function with a "To" (subscriber phone number), "From" (your Twilio Phone Number), and "Body" parameters to a number which cannot receive SMS messages or is unsubscribed (texted STOP to your Twilio Number) to test.

```sh
curl --location --request POST 'https://voice-notifications-6377-dev.twil.io/sendSMS' \
--header 'Content-Type: application/json' \
--data-raw '{
    "From": "+19197377453",
    "To": "+17048193222",
    "Body": "Hello, your table is ready now. Please proceed to the host stand."
}'
```

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mark Vickstrom - mvickstrom@twilio.com

Project Link: [https://github.com/mdvickst/voice-notifications](https://github.com/mdvickst/voice-notifications)

<p align="right">(<a href="#top">back to top</a>)</p>