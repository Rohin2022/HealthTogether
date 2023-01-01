<img src="https://github.com/Rohin2022/HealthTogether/blob/main/Logo.png" alt="HealthBrain Logo" width="200"/>

# HealthTogether
An efficient online platform that connects doctors and patients

## My Inspiration
 - Unequal **access to health care**, especially for those in rural communities
     - For instance, those in rural areas sometimes have to **travel up to 200 miles** to meet a obstetrician or gynecologist [AAMC](https://www.aamc.org/news-insights/health-disparities-affect-millions-rural-us-communities)
 - The shortage in physicians
     - In the next 12 years, the US will have a predicted **shortage of between 37,800 and 124,000 physicians** [AAMC](https://www.ama-assn.org/practice-management/sustainability/doctor-shortages-are-here-and-they-ll-get-worse-if-we-don-t-act)
 - Current telehealth systems can cost between **$20,000 and $30,000** [SOFTERMII](https://www.softermii.com/blog/cost-of-telemedicine), further **disadvantaging underfunded hospitals**
 
 ## My Solution
  - A simple online platform that **matches patients with doctors and one another** and allows for **efficient and safe communication** regarding the patient's condition
 - **Clean, minimalist** Web UI interface allows users to efficiently interact with one another
 - Proprietary recommendation engine **matches patients with doctors** based upon an advanced set of features
 - ML algorithm that interacts with patients during off hours, **allowing patients to receive feedback and assistance** when no doctors are present
 - A second recommendation algorithm identifies other patients who have had **similar ailments and allows them to chat** with one another, **providing assistance and comfort** from someone who has had a similar condition and allowing for a **more intimate and personal connection than with a doctor**
 - Database of **prescription drugs that have successfully combated certain ailments** are recommended to the doctor, helping to **increase their efficiency**
 - A toxicity algorithm **vetts unproductive and rude conversations** between patients, ensuring a **kind and comforting online space**

## Development process
1. Utilized ReactJS for the UI interface, and python for the various machine learning components
2. Integrated Firebase Realtime database with the UI
3. Trained a custom toxicity classification model using [Cohere](https://cohere.ai/)
4. Drug recommendation algorithm created - [Colab Notebook](https://colab.research.google.com/drive/1UcfWa2o4OalsXuENEBfH7py548_xlFBu?usp=sharing)
5. Flask API created to host ML algorithms
6. Integrated the APIs into the project 

## User Experience
 - By matching users with others with similar conditions, users can **empathize with one another**, fostering a **comforting online environment**
 - Simple UI **reduces technical complexities** and provides users with a more **efficient experience**
 - Chat algorithm allows users to receive feedback **whenever they need it**

## User Privacy
 - All data is stored using Firebase, which encrypts data in transit using HTTPS [Firebase](https://firebase.google.com/support/privacy#:~:text=Firebase%20services%20encrypt%20data%20in,Cloud%20Functions%20for%20Firebase)
 - Additional security measures are necessary and I hope to add these in future iterations of this project
 
 ## Future Improvements
  - Adding **additional security measures**
  - Improving the **accuracy of the toxicity classifier**
  - **Further streamlining** the user experience (from both the patient and physician perspectives)
  - Creating an app to provide users with a **more native experience** on mobile devices
  
## Challenges during development
 - **Limited time** made it difficult to implement **all the features that I wanted**
 - Using **many different languages and APIs** made development more difficult
 
## Accomplishments
 - I'm proud of the UI and how it ensures an efficient user experience

## What I learned
 - I learned more about designing and creating minimalist UIs
 - Additionally, I learned more about firebase and its various real-time capabilities

### Sources
#### Drug Review Dataset
Felix Gräßer, Surya Kallumadi, Hagen Malberg, and Sebastian Zaunseder. 2018. Aspect-Based Sentiment Analysis of Drug Reviews Applying Cross-Domain and Cross-Data Learning. In Proceedings of the 2018 International Conference on Digital Health (DH '18). ACM, New York, NY, USA, 121-125. DOI: [Web Link]
