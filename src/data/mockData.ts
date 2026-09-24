import type {
  Contributor,
  Course,
  Department,
  ReferenceBook,
  Release,
  Resource,
} from "./types";

export const referenceBooks: ReferenceBook[] = [
  {
    "id": "ref-math3",
    "courseId": "c22",
    "courseName": "MATHEMATICS 3",
    "title": "Probability & Statistics for Engineers & Scientists",
    "author": "Ronald E. Walpole, Raymond H Myers, Sharon L Myers & Keying Ye",
    "edition": "9th Edition",
    "publisher": "Pearson Education",
    "year": "2017",
    "citation": "Ronald E. Walpole, Raymond H Myers, Sharon L Myers & Keying Ye 'Probability & Statistics for Engineers & Scientists', Pearson Education, 9th edition, 2017",
    "amazonUrl": "https://www.amazon.in/s?k=Probability+Statistics+for+Engineers+Scientists+Walpole+9th+Edition",
    "coverImage": "/textbooks/image26.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-ddco",
    "courseId": "c10",
    "courseName": "DIGITAL DESIGN AND COMPUTER ORGANIZATION",
    "title": "Digital Design with an Introduction to Verilog Design",
    "author": "M. Morris Mano & Michael D. Ciletti",
    "edition": "6th Edition",
    "publisher": "Pearson Education",
    "year": "2018",
    "citation": "M. Morris Mano & Michael D. Ciletti, Digital Design with an Introduction to Verilog Design, 6e, Pearson Education, 2018.",
    "amazonUrl": "https://www.amazon.in/s?k=Digital+Design+with+an+Introduction+to+Verilog+Design+Mano+Ciletti+6th+Edition",
    "coverImage": "/textbooks/image25.png",
    "spineColor": "#3d2b42"
  },
  {
    "id": "ref-os",
    "courseId": "c26",
    "courseName": "OPERATING SYSTEMS",
    "title": "Operating System Principles / Operating System Concepts",
    "author": "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne",
    "edition": "8th Edition",
    "publisher": "Wiley-India",
    "year": "2015",
    "citation": "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne, Operating System Principles 8th edition, Wiley-India, 2015",
    "amazonUrl": "https://www.amazon.in/Operating-System-Concepts-Abraham-Silberschatz/dp/B074G46V8F",
    "coverImage": "/textbooks/image24.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-dsa",
    "courseId": "c07",
    "courseName": "DATA STRUCTURE AND APPLICATIONS",
    "title": "Fundamentals of Data Structures in C",
    "author": "Ellis Horowitz and Sartaj Sahni",
    "edition": "2nd Edition",
    "publisher": "Universities Press",
    "year": "2019",
    "citation": "Ellis Horowitz and Sartaj Sahni, Fundamentals of Data Structures in C, Universities Press, 2nd edition, 2019",
    "amazonUrl": "https://www.amazon.in/s?k=Fundamentals+of+Data+Structures+in+C+Horowitz+Sahni+2nd+Edition",
    "coverImage": "/textbooks/image23.png",
    "spineColor": "#523758"
  },
  {
    "id": "ref-cpp",
    "courseId": "c25",
    "courseName": "OOPS WITH C++",
    "title": "C++ The Complete Reference",
    "author": "Herbert Schildt",
    "edition": "4th Edition",
    "publisher": "TMH",
    "year": "2005",
    "citation": "Herbert Schildt, The Complete Reference C++, 4th edition, TMH, 2005",
    "amazonUrl": "https://www.amazon.in/s?k=C%2B%2B+The+Complete+Reference+4th+Edition+Herbert+Schildt",
    "coverImage": "/textbooks/image22.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-git",
    "courseId": "c29",
    "courseName": "PROJECT MANAGEMENT WITH GIT",
    "title": "Version Control with Git",
    "author": "Prem Kumar Ponuthorai, Jon Loeliger",
    "edition": "3rd Edition",
    "publisher": "O'Reilly Media, Inc.",
    "year": "2022",
    "citation": "Version Control with Git, 3rd Edition, by Prem Kumar Ponuthorai, Jon Loeliger Released October 2022, Publisher(s): O'Reilly Media, Inc.",
    "amazonUrl": "https://www.amazon.in/s?k=Version+Control+with+Git+3rd+Edition+Prem+Kumar+Ponuthorai+Jon+Loeliger",
    "coverImage": "/textbooks/image21.png",
    "spineColor": "#3d2b42"
  },
  {
    "id": "ref-ada",
    "courseId": "c01",
    "courseName": "ANALYSIS AND DESIGN OF ALGORITHMS",
    "title": "Introduction to the Design and Analysis of Algorithms",
    "author": "Anany Levitin",
    "edition": "2nd Edition",
    "publisher": "Pearson",
    "year": "2009",
    "citation": "Introduction to the Design and Analysis of Algorithms, Anany Levitin: 2nd Edition, 2009. Pearson.",
    "amazonUrl": "https://www.amazon.in/s?k=Introduction+to+the+Design+and+Analysis+of+Algorithms+2nd+Edition+Anany+Levitin",
    "coverImage": "/textbooks/image20.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-ai",
    "courseId": "c02",
    "courseName": "ARTIFICIAL INTELLIGENCE",
    "title": "Artificial Intelligence: A Modern Approach",
    "author": "Stuart J. Russell and Peter Norvig",
    "edition": "4th Edition",
    "publisher": "Pearson Education",
    "year": "2021",
    "citation": "Stuart J. Russell and Peter Norvig, 'Artificial Intelligence \u2013 A Modern Approach', 4th Edition, Pearson Education, 2021.",
    "amazonUrl": "https://www.amazon.in/s?k=Artificial+Intelligence+A+Modern+Approach+4th+Edition+Russell+Norvig",
    "coverImage": "/textbooks/image19.png",
    "spineColor": "#523758"
  },
  {
    "id": "ref-dbms",
    "courseId": "c08",
    "courseName": "DATABASE MANAGEMENT SYSTEMS (DBMS)",
    "title": "Fundamentals of Database Systems",
    "author": "Ramez Elmasri and Shamkant B. Navathe",
    "edition": "7th Edition",
    "publisher": "Pearson",
    "year": "2017",
    "citation": "Fundamentals of Database Systems, Ramez Elmasri and Shamkant B. Navathe, 7th Edition, 2017, Pearson.",
    "amazonUrl": "https://www.amazon.in/s?k=Fundamentals+of+Database+Systems+7th+Edition+Elmasri+Navathe",
    "coverImage": "/textbooks/image18.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-opt",
    "courseId": "c27",
    "courseName": "OPTIMIZATION TECHNIQUES",
    "title": "Operations Research",
    "author": "S.D. Sharma",
    "edition": "Revised Edition",
    "publisher": "Kedar Nath Ram Nath & Co",
    "year": "2008",
    "citation": "Operations Research - S.D.Sharma, Kedar nath Ram nath & Co, 2008.",
    "amazonUrl": "https://www.amazon.in/s?k=Operations+Research+S+D+Sharma+Kedar+Nath+Ram+Nath",
    "coverImage": "/textbooks/image17.png",
    "spineColor": "#3d2b42"
  },
  {
    "id": "ref-mongo",
    "courseId": "c23",
    "courseName": "MongoDB",
    "title": "MongoDB: The Definitive Guide",
    "author": "Kristina Chodorow",
    "edition": "2nd Edition",
    "publisher": "O'REILLY",
    "year": "2013",
    "citation": "\"MongoDB: The Definitive Guide\", Kristina chodorow, 2nd ed O'REILLY, 2013.",
    "amazonUrl": "https://www.amazon.in/s?k=MongoDB+The+Definitive+Guide+2nd+Edition+Kristina+Chodorow",
    "coverImage": "/textbooks/image16.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-eng",
    "courseId": "c11",
    "courseName": "ENGLISH",
    "title": "Professional Writing Skills in English",
    "author": "Fillip Learning",
    "edition": "1st Edition",
    "publisher": "Fillip Learning \u2013 Education (ILS), Bangalore",
    "year": "2022",
    "citation": "Professional Writing Skills in English published by Fillip Learning \u2013 Education (ILS), Bangalore \u2013 2022.",
    "amazonUrl": "https://www.amazon.in/s?k=Professional+Writing+Skills+in+English+Fillip+Learning",
    "coverImage": "/textbooks/image15.png",
    "spineColor": "#523758"
  },
  {
    "id": "ref-sepm",
    "courseId": "c33",
    "courseName": "SOFTWARE ENGINEERING AND PROJECT MANAGEMENT",
    "title": "Software Engineering",
    "author": "Ian Sommerville",
    "edition": "9th Edition",
    "publisher": "Pearson Education",
    "year": "2017",
    "citation": "Ian Sommerville: Software Engineering, 9th Edition, Pearson Education, 2017.",
    "amazonUrl": "https://www.amazon.in/s?k=Software+Engineering+9th+Edition+Ian+Sommerville",
    "coverImage": "/textbooks/image14.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-dcn",
    "courseId": "c06",
    "courseName": "DATA COMMUNICATION AND NETWORKING",
    "title": "Data Communications and Networking",
    "author": "Behrouz A. Forouzan",
    "edition": "5th Edition",
    "publisher": "Tata McGraw-Hill",
    "year": "2013",
    "citation": "Behrouz A. Forouzan, Data Communications and Networking 5E, 5th Edition, Tata McGraw-Hill, 2013",
    "amazonUrl": "https://www.amazon.in/s?k=Data+Communications+and+Networking+5th+Edition+Behrouz+Forouzan",
    "coverImage": "/textbooks/image13.png",
    "spineColor": "#3d2b42"
  },
  {
    "id": "ref-ml",
    "courseId": "bookshelf-ml",
    "courseName": "Machine Learning",
    "title": "Machine Learning",
    "author": "Tom Mitchell",
    "edition": "1st Edition",
    "publisher": "McGraw Hill",
    "year": "1997",
    "isbn": "0070428077",
    "citation": "Machine Learning, Tom Mitchell, McGraw Hill, 1997. ISBN: 0070428077",
    "amazonUrl": "https://www.amazon.in/s?k=Machine+Learning+Tom+Mitchell+0070428077",
    "coverImage": "/textbooks/image12.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-cv",
    "courseId": "c05",
    "courseName": "COMPUTER VISION",
    "title": "Computer Vision: Algorithms and Applications",
    "author": "Richard Szeliski",
    "edition": "2nd Edition",
    "publisher": "Springer",
    "year": "2020",
    "citation": "Computer Vision: Algorithms and Applications (CVAA), Richard Szeliski, Springer 2nd edition, 2020.",
    "amazonUrl": "https://www.amazon.in/s?k=Computer+Vision+Algorithms+and+Applications+2nd+Edition+Richard+Szeliski",
    "coverImage": "/textbooks/image11.png",
    "spineColor": "#523758"
  },
  {
    "id": "ref-rmipr",
    "courseId": "c31",
    "courseName": "RESEARCH METHODOLOGY AND IPR",
    "title": "Research Methodology: Methods and Techniques",
    "author": "CR Kothari and Gaurav Garg",
    "edition": "4th Edition",
    "publisher": "New Age International Publishers",
    "year": "2020",
    "citation": "CR Kothari and Gaurav Garg, Research Methodology, New Age International Publishers, 2020.",
    "amazonUrl": "https://www.amazon.in/s?k=Research+Methodology+Kothari+Gaurav+Garg",
    "coverImage": "/textbooks/image10.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-math1",
    "courseId": "c20",
    "courseName": "MATHEMATICS 1",
    "title": "Higher Engineering Mathematics (Mathematics for CSE Stream \u2013 I)",
    "author": "B. S. Grewal",
    "edition": "44th Edition",
    "publisher": "Khanna Publishers",
    "year": "2021",
    "citation": "B. S. Grewal: Higher Engineering Mathematics, Khanna Publishers, 44th Ed., 2021",
    "amazonUrl": "https://www.amazon.in/BS-Grewal-Engineering-Mathematics-2023-24/dp/B0CKBZZ8NH",
    "coverImage": "/textbooks/image9.png",
    "spineColor": "#3d2b42"
  },
  {
    "id": "ref-popc",
    "courseId": "c28",
    "courseName": "PRINCIPLES OF PROGRAMMING USING C (POPC)",
    "title": "Computer Fundamentals and Programming in C",
    "author": "Reema Thareja",
    "edition": "2nd Edition",
    "publisher": "Oxford University Press",
    "year": "2017",
    "citation": "Computer fundamentals and programming in c, Reema Thareja, Oxford University, Second edition, 2017.",
    "amazonUrl": "https://www.amazon.in/s?k=Computer+Fundamentals+and+Programming+in+C+Reema+Thareja+2nd+Edition",
    "coverImage": "/textbooks/image8.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-elec",
    "courseId": "c15",
    "courseName": "INTRODUCTION TO ELECTRONICS ENGINEERING",
    "title": "Electronic Circuits, Fundamentals & Applications",
    "author": "Mike Tooley",
    "edition": "4th Edition",
    "publisher": "Elsevier",
    "year": "2015",
    "doiUrl": "https://doi.org/10.4324/9781315737980",
    "isbn": "9781315737980",
    "citation": "Mike Tooley, Electronic Circuits, Fundamentals & Applications, 4th Edition, Elsevier, 2015. DOI https://doi.org/10.4324/9781315737980. eBook ISBN9781315737980",
    "amazonUrl": "https://www.amazon.in/s?k=Electronic+Circuits+Fundamentals+and+Applications+Mike+Tooley",
    "coverImage": "/textbooks/image7.png",
    "spineColor": "#523758"
  },
  {
    "id": "ref-iot",
    "courseId": "c17",
    "courseName": "INTRODUCTION TO IOT",
    "title": "Introduction to IoT",
    "author": "Sudip Misra, Anandarup Mukherjee, Arijit Roy",
    "edition": "1st Edition",
    "publisher": "Cambridge University Press",
    "year": "2021",
    "citation": "Sudip Misra, Anandarup Mukherjee, Arijit Roy, Introduction to IoT, Cambridge University Press 2021.",
    "amazonUrl": "https://www.amazon.in/s?k=Introduction+to+IoT+Sudip+Misra+Anandarup+Mukherjee+Arijit+Roy",
    "coverImage": "/textbooks/image6.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-idt",
    "courseId": "c12",
    "courseName": "IDT",
    "title": "Handbook of Design Thinking: Tips & Tools for How to Design Thinking",
    "author": "Christian Mueller-Roterberg",
    "edition": "1st Edition",
    "publisher": "Kindle Direct Publishing",
    "year": "2018",
    "citation": "Christian Mueller-Roterberg, Handbook of Design Thinking, Tips & Tools for how to design thinking, Kindle Direct Publishing, 2018",
    "amazonUrl": "https://www.amazon.in/s?k=Handbook+of+Design+Thinking+Christian+Mueller+Roterberg",
    "coverImage": "/textbooks/image5.png",
    "spineColor": "#3d2b42"
  },
  {
    "id": "ref-math2",
    "courseId": "c21",
    "courseName": "MATHEMATICS 2",
    "title": "Higher Engineering Mathematics (Mathematics-II)",
    "author": "B. S. Grewal",
    "edition": "44th Edition",
    "publisher": "Khanna Publishers",
    "year": "2021",
    "citation": "B. S. Grewal: Higher Engineering Mathematics, Khanna Publishers, 44th Ed., 2021.",
    "amazonUrl": "https://www.amazon.in/BS-Grewal-Engineering-Mathematics-2023-24/dp/B0CKBZZ8NH",
    "coverImage": "/textbooks/image4.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-caed",
    "courseId": "c04",
    "courseName": "CAED",
    "title": "Engineering Graphics (COMPUTER AIDED ENGINEERING DRAWING)",
    "author": "K.R. Gopalakrishna",
    "edition": "32nd Edition",
    "publisher": "Subhas Publications, Bangalore",
    "year": "2013",
    "citation": "K.R. Gopalakrishna, Engineering Graphics, 32nd ed. Bangalore: Subhas Publications, 2013.",
    "amazonUrl": "https://www.amazon.in/s?k=Engineering+Graphics+K+R+Gopalakrishna+32nd+Edition",
    "coverImage": "/textbooks/image3.png",
    "spineColor": "#523758"
  },
  {
    "id": "ref-python",
    "courseId": "c16",
    "courseName": "INTRODUCTION TO PYTHON PROGRAMMING",
    "title": "Automate the Boring Stuff with Python",
    "author": "Al Sweigart",
    "edition": "1st Edition",
    "publisher": "No Starch Press",
    "year": "2015",
    "citation": "Al Sweigart, Automate the Boring Stuff with Python, 1st Edition, No Starch Press, 2015.",
    "amazonUrl": "https://www.amazon.in/s?k=Automate+the+Boring+Stuff+with+Python+Al+Sweigart",
    "coverImage": "/textbooks/image2.png",
    "spineColor": "#48334d"
  },
  {
    "id": "ref-ic",
    "courseId": "c13",
    "courseName": "INDIAN CONSTITUTION",
    "title": "Constitution of India (for Competitive Exams)",
    "author": "Naidhruva Edutech Learning Solutions",
    "edition": "2022 Edition",
    "publisher": "Naidhruva Edutech Learning Solutions, Bengaluru",
    "year": "2022",
    "citation": "Constitution of India (for Competitive Exams), Naidhruva Edutech Learning Solutions, Bengaluru. \u2013 2022.",
    "amazonUrl": "https://www.amazon.in/s?k=Constitution+of+India+for+Competitive+Exams+Naidhruva+Edutech",
    "coverImage": "/textbooks/image1.png",
    "spineColor": "#3d2b42"
  }
];

export const departments: Department[] = [
  {
    "id": "cse",
    "name": "Computer Science & Engineering",
    "short": "CSE",
    "courseCount": 9
  },
  {
    "id": "ise",
    "name": "Information Science & Engineering",
    "short": "ISE",
    "courseCount": 5
  },
  {
    "id": "aiml",
    "name": "Artificial Intelligence & Machine Learning",
    "short": "AI&ML",
    "courseCount": 5
  },
  {
    "id": "ece",
    "name": "Electronics & Communication Engineering",
    "short": "ECE",
    "courseCount": 4
  },
  {
    "id": "eee",
    "name": "Electrical & Electronics Engineering",
    "short": "EEE",
    "courseCount": 3
  },
  {
    "id": "mech",
    "name": "Mechanical Engineering",
    "short": "MECH",
    "courseCount": 3
  },
  {
    "id": "civil",
    "name": "Civil Engineering",
    "short": "CIVIL",
    "courseCount": 5
  }
];

export const courses: Course[] = [
  {
    "id": "c01",
    "title": "ANALYSIS AND DESIGN OF ALGORITHMS",
    "departmentId": "cse",
    "semester": 4,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-ada",
      "courseId": "c01",
      "courseName": "ANALYSIS AND DESIGN OF ALGORITHMS",
      "title": "Introduction to the Design and Analysis of Algorithms",
      "author": "Anany Levitin",
      "edition": "2nd Edition",
      "publisher": "Pearson",
      "year": "2009",
      "citation": "Introduction to the Design and Analysis of Algorithms, Anany Levitin: 2nd Edition, 2009. Pearson.",
      "amazonUrl": "https://www.amazon.in/s?k=Introduction+to+the+Design+and+Analysis+of+Algorithms+2nd+Edition+Anany+Levitin",
      "coverImage": "/textbooks/image20.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c02",
    "title": "ARTIFICIAL INTELLIGENCE",
    "departmentId": "aiml",
    "semester": 5,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-ai",
      "courseId": "c02",
      "courseName": "ARTIFICIAL INTELLIGENCE",
      "title": "Artificial Intelligence: A Modern Approach",
      "author": "Stuart J. Russell and Peter Norvig",
      "edition": "4th Edition",
      "publisher": "Pearson Education",
      "year": "2021",
      "citation": "Stuart J. Russell and Peter Norvig, 'Artificial Intelligence \u2013 A Modern Approach', 4th Edition, Pearson Education, 2021.",
      "amazonUrl": "https://www.amazon.in/s?k=Artificial+Intelligence+A+Modern+Approach+4th+Edition+Russell+Norvig",
      "coverImage": "/textbooks/image19.png",
      "spineColor": "#523758"
    }
  },
  {
    "id": "c03",
    "title": "BIOLOGY FOR IT",
    "departmentId": "cse",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras"
    ],
    "resourceCount": 1
  },
  {
    "id": "c04",
    "title": "CAED",
    "departmentId": "mech",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-caed",
      "courseId": "c04",
      "courseName": "CAED",
      "title": "Engineering Graphics (COMPUTER AIDED ENGINEERING DRAWING)",
      "author": "K.R. Gopalakrishna",
      "edition": "32nd Edition",
      "publisher": "Subhas Publications, Bangalore",
      "year": "2013",
      "citation": "K.R. Gopalakrishna, Engineering Graphics, 32nd ed. Bangalore: Subhas Publications, 2013.",
      "amazonUrl": "https://www.amazon.in/s?k=Engineering+Graphics+K+R+Gopalakrishna+32nd+Edition",
      "coverImage": "/textbooks/image3.png",
      "spineColor": "#523758"
    }
  },
  {
    "id": "c05",
    "title": "COMPUTER VISION",
    "departmentId": "aiml",
    "semester": 6,
    "allowedCategories": [
      "notes",
      "past-paper",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-cv",
      "courseId": "c05",
      "courseName": "COMPUTER VISION",
      "title": "Computer Vision: Algorithms and Applications",
      "author": "Richard Szeliski",
      "edition": "2nd Edition",
      "publisher": "Springer",
      "year": "2020",
      "citation": "Computer Vision: Algorithms and Applications (CVAA), Richard Szeliski, Springer 2nd edition, 2020.",
      "amazonUrl": "https://www.amazon.in/s?k=Computer+Vision+Algorithms+and+Applications+2nd+Edition+Richard+Szeliski",
      "coverImage": "/textbooks/image11.png",
      "spineColor": "#523758"
    }
  },
  {
    "id": "c06",
    "title": "DATA COMMUNICATION AND NETWORKING",
    "departmentId": "ise",
    "semester": 5,
    "allowedCategories": [
      "notes",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-dcn",
      "courseId": "c06",
      "courseName": "DATA COMMUNICATION AND NETWORKING",
      "title": "Data Communications and Networking",
      "author": "Behrouz A. Forouzan",
      "edition": "5th Edition",
      "publisher": "Tata McGraw-Hill",
      "year": "2013",
      "citation": "Behrouz A. Forouzan, Data Communications and Networking 5E, 5th Edition, Tata McGraw-Hill, 2013",
      "amazonUrl": "https://www.amazon.in/s?k=Data+Communications+and+Networking+5th+Edition+Behrouz+Forouzan",
      "coverImage": "/textbooks/image13.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c07",
    "title": "DATA STRUCTURE AND APPLICATIONS",
    "departmentId": "cse",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-dsa",
      "courseId": "c07",
      "courseName": "DATA STRUCTURE AND APPLICATIONS",
      "title": "Fundamentals of Data Structures in C",
      "author": "Ellis Horowitz and Sartaj Sahni",
      "edition": "2nd Edition",
      "publisher": "Universities Press",
      "year": "2019",
      "citation": "Ellis Horowitz and Sartaj Sahni, Fundamentals of Data Structures in C, Universities Press, 2nd edition, 2019",
      "amazonUrl": "https://www.amazon.in/s?k=Fundamentals+of+Data+Structures+in+C+Horowitz+Sahni+2nd+Edition",
      "coverImage": "/textbooks/image23.png",
      "spineColor": "#523758"
    }
  },
  {
    "id": "c08",
    "title": "DATABASE MANAGEMENT SYSTEMS (DBMS)",
    "departmentId": "cse",
    "semester": 4,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-dbms",
      "courseId": "c08",
      "courseName": "DATABASE MANAGEMENT SYSTEMS (DBMS)",
      "title": "Fundamentals of Database Systems",
      "author": "Ramez Elmasri and Shamkant B. Navathe",
      "edition": "7th Edition",
      "publisher": "Pearson",
      "year": "2017",
      "citation": "Fundamentals of Database Systems, Ramez Elmasri and Shamkant B. Navathe, 7th Edition, 2017, Pearson.",
      "amazonUrl": "https://www.amazon.in/s?k=Fundamentals+of+Database+Systems+7th+Edition+Elmasri+Navathe",
      "coverImage": "/textbooks/image18.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c09",
    "title": "DEEP LEARNING",
    "departmentId": "aiml",
    "semester": 6,
    "allowedCategories": [
      "past-paper"
    ],
    "resourceCount": 1
  },
  {
    "id": "c10",
    "title": "DIGITAL DESIGN AND COMPUTER ORGANIZATION",
    "departmentId": "cse",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-ddco",
      "courseId": "c10",
      "courseName": "DIGITAL DESIGN AND COMPUTER ORGANIZATION",
      "title": "Digital Design with an Introduction to Verilog Design",
      "author": "M. Morris Mano & Michael D. Ciletti",
      "edition": "6th Edition",
      "publisher": "Pearson Education",
      "year": "2018",
      "citation": "M. Morris Mano & Michael D. Ciletti, Digital Design with an Introduction to Verilog Design, 6e, Pearson Education, 2018.",
      "amazonUrl": "https://www.amazon.in/s?k=Digital+Design+with+an+Introduction+to+Verilog+Design+Mano+Ciletti+6th+Edition",
      "coverImage": "/textbooks/image25.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c11",
    "title": "ENGLISH",
    "departmentId": "humanities",
    "semester": 1,
    "allowedCategories": [
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-eng",
      "courseId": "c11",
      "courseName": "ENGLISH",
      "title": "Professional Writing Skills in English",
      "author": "Fillip Learning",
      "edition": "1st Edition",
      "publisher": "Fillip Learning \u2013 Education (ILS), Bangalore",
      "year": "2022",
      "citation": "Professional Writing Skills in English published by Fillip Learning \u2013 Education (ILS), Bangalore \u2013 2022.",
      "amazonUrl": "https://www.amazon.in/s?k=Professional+Writing+Skills+in+English+Fillip+Learning",
      "coverImage": "/textbooks/image15.png",
      "spineColor": "#523758"
    }
  },
  {
    "id": "c12",
    "title": "IDT",
    "departmentId": "basic-sci",
    "semester": 2,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-idt",
      "courseId": "c12",
      "courseName": "IDT",
      "title": "Handbook of Design Thinking: Tips & Tools for How to Design Thinking",
      "author": "Christian Mueller-Roterberg",
      "edition": "1st Edition",
      "publisher": "Kindle Direct Publishing",
      "year": "2018",
      "citation": "Christian Mueller-Roterberg, Handbook of Design Thinking, Tips & Tools for how to design thinking, Kindle Direct Publishing, 2018",
      "amazonUrl": "https://www.amazon.in/s?k=Handbook+of+Design+Thinking+Christian+Mueller+Roterberg",
      "coverImage": "/textbooks/image5.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c13",
    "title": "INDIAN CONSTITUTION",
    "departmentId": "humanities",
    "semester": 2,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-ic",
      "courseId": "c13",
      "courseName": "INDIAN CONSTITUTION",
      "title": "Constitution of India (for Competitive Exams)",
      "author": "Naidhruva Edutech Learning Solutions",
      "edition": "2022 Edition",
      "publisher": "Naidhruva Edutech Learning Solutions, Bengaluru",
      "year": "2022",
      "citation": "Constitution of India (for Competitive Exams), Naidhruva Edutech Learning Solutions, Bengaluru. \u2013 2022.",
      "amazonUrl": "https://www.amazon.in/s?k=Constitution+of+India+for+Competitive+Exams+Naidhruva+Edutech",
      "coverImage": "/textbooks/image1.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c14",
    "title": "INTRODUCTION TO ELECTRICAL ENGINEERING",
    "departmentId": "eee",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras"
    ],
    "resourceCount": 1
  },
  {
    "id": "c15",
    "title": "INTRODUCTION TO ELECTRONICS ENGINEERING",
    "departmentId": "ece",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-elec",
      "courseId": "c15",
      "courseName": "INTRODUCTION TO ELECTRONICS ENGINEERING",
      "title": "Electronic Circuits, Fundamentals & Applications",
      "author": "Mike Tooley",
      "edition": "4th Edition",
      "publisher": "Elsevier",
      "year": "2015",
      "doiUrl": "https://doi.org/10.4324/9781315737980",
      "isbn": "9781315737980",
      "citation": "Mike Tooley, Electronic Circuits, Fundamentals & Applications, 4th Edition, Elsevier, 2015. DOI https://doi.org/10.4324/9781315737980. eBook ISBN9781315737980",
      "amazonUrl": "https://www.amazon.in/s?k=Electronic+Circuits+Fundamentals+and+Applications+Mike+Tooley",
      "coverImage": "/textbooks/image7.png",
      "spineColor": "#523758"
    }
  },
  {
    "id": "c16",
    "title": "INTRODUCTION TO PYTHON PROGRAMMING",
    "departmentId": "cse",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-python",
      "courseId": "c16",
      "courseName": "INTRODUCTION TO PYTHON PROGRAMMING",
      "title": "Automate the Boring Stuff with Python",
      "author": "Al Sweigart",
      "edition": "1st Edition",
      "publisher": "No Starch Press",
      "year": "2015",
      "citation": "Al Sweigart, Automate the Boring Stuff with Python, 1st Edition, No Starch Press, 2015.",
      "amazonUrl": "https://www.amazon.in/s?k=Automate+the+Boring+Stuff+with+Python+Al+Sweigart",
      "coverImage": "/textbooks/image2.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c17",
    "title": "INTRODUCTION TO IOT",
    "departmentId": "ece",
    "semester": 4,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-iot",
      "courseId": "c17",
      "courseName": "INTRODUCTION TO IOT",
      "title": "Introduction to IoT",
      "author": "Sudip Misra, Anandarup Mukherjee, Arijit Roy",
      "edition": "1st Edition",
      "publisher": "Cambridge University Press",
      "year": "2021",
      "citation": "Sudip Misra, Anandarup Mukherjee, Arijit Roy, Introduction to IoT, Cambridge University Press 2021.",
      "amazonUrl": "https://www.amazon.in/s?k=Introduction+to+IoT+Sudip+Misra+Anandarup+Mukherjee+Arijit+Roy",
      "coverImage": "/textbooks/image6.png",
      "spineColor": "#48334d"
    }
  },

  {
    "id": "c19",
    "title": "MATERIALS CHEMISTRY FOR ENERGY AND DATA PROCESSING",
    "departmentId": "basic-sci",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras"
    ],
    "resourceCount": 1
  },
  {
    "id": "c20",
    "title": "MATHEMATICS 1",
    "departmentId": "basic-sci",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-math1",
      "courseId": "c20",
      "courseName": "MATHEMATICS 1",
      "title": "Higher Engineering Mathematics (Mathematics for CSE Stream \u2013 I)",
      "author": "B. S. Grewal",
      "edition": "44th Edition",
      "publisher": "Khanna Publishers",
      "year": "2021",
      "citation": "B. S. Grewal: Higher Engineering Mathematics, Khanna Publishers, 44th Ed., 2021",
      "amazonUrl": "https://www.amazon.in/BS-Grewal-Engineering-Mathematics-2023-24/dp/B0CKBZZ8NH",
      "coverImage": "/textbooks/image9.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c21",
    "title": "MATHEMATICS 2",
    "departmentId": "basic-sci",
    "semester": 2,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-math2",
      "courseId": "c21",
      "courseName": "MATHEMATICS 2",
      "title": "Higher Engineering Mathematics (Mathematics-II)",
      "author": "B. S. Grewal",
      "edition": "44th Edition",
      "publisher": "Khanna Publishers",
      "year": "2021",
      "citation": "B. S. Grewal: Higher Engineering Mathematics, Khanna Publishers, 44th Ed., 2021.",
      "amazonUrl": "https://www.amazon.in/BS-Grewal-Engineering-Mathematics-2023-24/dp/B0CKBZZ8NH",
      "coverImage": "/textbooks/image4.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c22",
    "title": "MATHEMATICS 3",
    "departmentId": "basic-sci",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-math3",
      "courseId": "c22",
      "courseName": "MATHEMATICS 3",
      "title": "Probability & Statistics for Engineers & Scientists",
      "author": "Ronald E. Walpole, Raymond H Myers, Sharon L Myers & Keying Ye",
      "edition": "9th Edition",
      "publisher": "Pearson Education",
      "year": "2017",
      "citation": "Ronald E. Walpole, Raymond H Myers, Sharon L Myers & Keying Ye 'Probability & Statistics for Engineers & Scientists', Pearson Education, 9th edition, 2017",
      "amazonUrl": "https://www.amazon.in/s?k=Probability+Statistics+for+Engineers+Scientists+Walpole+9th+Edition",
      "coverImage": "/textbooks/image26.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c23",
    "title": "MongoDB",
    "departmentId": "ise",
    "semester": 4,
    "allowedCategories": [
      "notes",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-mongo",
      "courseId": "c23",
      "courseName": "MongoDB",
      "title": "MongoDB: The Definitive Guide",
      "author": "Kristina Chodorow",
      "edition": "2nd Edition",
      "publisher": "O'REILLY",
      "year": "2013",
      "citation": "\"MongoDB: The Definitive Guide\", Kristina chodorow, 2nd ed O'REILLY, 2013.",
      "amazonUrl": "https://www.amazon.in/s?k=MongoDB+The+Definitive+Guide+2nd+Edition+Kristina+Chodorow",
      "coverImage": "/textbooks/image16.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c24",
    "title": "NATURAL LANGUAGE PROCESSING",
    "departmentId": "aiml",
    "semester": 6,
    "allowedCategories": [
      "notes",
      "past-paper"
    ],
    "resourceCount": 1
  },
  {
    "id": "c25",
    "title": "OOPS WITH C++",
    "departmentId": "cse",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-cpp",
      "courseId": "c25",
      "courseName": "OOPS WITH C++",
      "title": "C++ The Complete Reference",
      "author": "Herbert Schildt",
      "edition": "4th Edition",
      "publisher": "TMH",
      "year": "2005",
      "citation": "Herbert Schildt, The Complete Reference C++, 4th edition, TMH, 2005",
      "amazonUrl": "https://www.amazon.in/s?k=C%2B%2B+The+Complete+Reference+4th+Edition+Herbert+Schildt",
      "coverImage": "/textbooks/image22.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c26",
    "title": "OPERATING SYSTEMS",
    "departmentId": "cse",
    "semester": 4,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-os",
      "courseId": "c26",
      "courseName": "OPERATING SYSTEMS",
      "title": "Operating System Principles / Operating System Concepts",
      "author": "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne",
      "edition": "8th Edition",
      "publisher": "Wiley-India",
      "year": "2015",
      "citation": "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne, Operating System Principles 8th edition, Wiley-India, 2015",
      "amazonUrl": "https://www.amazon.in/Operating-System-Concepts-Abraham-Silberschatz/dp/B074G46V8F",
      "coverImage": "/textbooks/image24.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c27",
    "title": "OPTIMIZATION TECHNIQUES",
    "departmentId": "aiml",
    "semester": 5,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-opt",
      "courseId": "c27",
      "courseName": "OPTIMIZATION TECHNIQUES",
      "title": "Operations Research",
      "author": "S.D. Sharma",
      "edition": "Revised Edition",
      "publisher": "Kedar Nath Ram Nath & Co",
      "year": "2008",
      "citation": "Operations Research - S.D.Sharma, Kedar nath Ram nath & Co, 2008.",
      "amazonUrl": "https://www.amazon.in/s?k=Operations+Research+S+D+Sharma+Kedar+Nath+Ram+Nath",
      "coverImage": "/textbooks/image17.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c28",
    "title": "PRINCIPLES OF PROGRAMMING USING C (POPC)",
    "departmentId": "cse",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-popc",
      "courseId": "c28",
      "courseName": "PRINCIPLES OF PROGRAMMING USING C (POPC)",
      "title": "Computer Fundamentals and Programming in C",
      "author": "Reema Thareja",
      "edition": "2nd Edition",
      "publisher": "Oxford University Press",
      "year": "2017",
      "citation": "Computer fundamentals and programming in c, Reema Thareja, Oxford University, Second edition, 2017.",
      "amazonUrl": "https://www.amazon.in/s?k=Computer+Fundamentals+and+Programming+in+C+Reema+Thareja+2nd+Edition",
      "coverImage": "/textbooks/image8.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c29",
    "title": "PROJECT MANAGEMENT WITH GIT",
    "departmentId": "ise",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-git",
      "courseId": "c29",
      "courseName": "PROJECT MANAGEMENT WITH GIT",
      "title": "Version Control with Git",
      "author": "Prem Kumar Ponuthorai, Jon Loeliger",
      "edition": "3rd Edition",
      "publisher": "O'Reilly Media, Inc.",
      "year": "2022",
      "citation": "Version Control with Git, 3rd Edition, by Prem Kumar Ponuthorai, Jon Loeliger Released October 2022, Publisher(s): O'Reilly Media, Inc.",
      "amazonUrl": "https://www.amazon.in/s?k=Version+Control+with+Git+3rd+Edition+Prem+Kumar+Ponuthorai+Jon+Loeliger",
      "coverImage": "/textbooks/image21.png",
      "spineColor": "#3d2b42"
    }
  },
  {
    "id": "c30",
    "title": "QUANTUM COMPUTING AND PHOTONICS",
    "departmentId": "basic-sci",
    "semester": 2,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras"
    ],
    "resourceCount": 1
  },
  {
    "id": "c31",
    "title": "RESEARCH METHODOLOGY AND IPR",
    "departmentId": "ise",
    "semester": 5,
    "allowedCategories": [
      "notes",
      "past-paper",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-rmipr",
      "courseId": "c31",
      "courseName": "RESEARCH METHODOLOGY AND IPR",
      "title": "Research Methodology: Methods and Techniques",
      "author": "CR Kothari and Gaurav Garg",
      "edition": "4th Edition",
      "publisher": "New Age International Publishers",
      "year": "2020",
      "citation": "CR Kothari and Gaurav Garg, Research Methodology, New Age International Publishers, 2020.",
      "amazonUrl": "https://www.amazon.in/s?k=Research+Methodology+Kothari+Gaurav+Garg",
      "coverImage": "/textbooks/image10.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c32",
    "title": "SCIENTIFIC FOUNDATIONS OF HEALTH",
    "departmentId": "basic-sci",
    "semester": 2,
    "allowedCategories": [
      "notes",
      "past-paper",
      "extras"
    ],
    "resourceCount": 1
  },
  {
    "id": "c33",
    "title": "SOFTWARE ENGINEERING AND PROJECT MANAGEMENT",
    "departmentId": "ise",
    "semester": 4,
    "allowedCategories": [
      "notes",
      "past-paper",
      "reference"
    ],
    "resourceCount": 1,
    "referenceBook": {
      "id": "ref-sepm",
      "courseId": "c33",
      "courseName": "SOFTWARE ENGINEERING AND PROJECT MANAGEMENT",
      "title": "Software Engineering",
      "author": "Ian Sommerville",
      "edition": "9th Edition",
      "publisher": "Pearson Education",
      "year": "2017",
      "citation": "Ian Sommerville: Software Engineering, 9th Edition, Pearson Education, 2017.",
      "amazonUrl": "https://www.amazon.in/s?k=Software+Engineering+9th+Edition+Ian+Sommerville",
      "coverImage": "/textbooks/image14.png",
      "spineColor": "#48334d"
    }
  },
  {
    "id": "c34",
    "title": "UNIVERSAL HUMAN VALUES",
    "departmentId": "humanities",
    "semester": 3,
    "allowedCategories": [
      "notes",
      "past-paper"
    ],
    "resourceCount": 1
  },
  {
    "id": "c18",
    "title": "KANNADA",
    "departmentId": "humanities",
    "semester": 1,
    "allowedCategories": [
      "notes",
      "past-paper"
    ],
    "resourceCount": 1
  }
];

export const contributors: Contributor[] = [
  {
    id: "cnt-1",
    name: "Gururaj Reddy",
    usn: "1BY24AI049",
    branch: "AIML",
    contributions: 76,
    points: 580,
    pastPapers: 28,
    notes: 28,
    extras: 20,
    reference: 0,
    upvotes: 69,
  },
  {
    id: "cnt-2",
    name: "Jyothiradithya J",
    usn: "1BY24AI056",
    branch: "AIML",
    contributions: 42,
    points: 377,
    pastPapers: 25,
    notes: 3,
    extras: 14,
    reference: 0,
    upvotes: 52,
  },
  {
    id: "cnt-3",
    name: "V Sathya Sai",
    usn: "1BY24AI182",
    branch: "AIML",
    contributions: 36,
    points: 330,
    pastPapers: 24,
    notes: 2,
    extras: 10,
    reference: 0,
    upvotes: 30,
  },
  {
    id: "cnt-4",
    name: "S Sumedh",
    usn: "1TD24AI163",
    branch: "AIML",
    contributions: 54,
    points: 324,
    pastPapers: 6,
    notes: 40,
    extras: 8,
    reference: 0,
    upvotes: 44,
  },
  {
    id: "cnt-5",
    name: "V Srisudarshan",
    usn: "1BY24AI190",
    branch: "AIML",
    contributions: 46,
    points: 289,
    pastPapers: 7,
    notes: 31,
    extras: 8,
    reference: 0,
    upvotes: 36,
  },
  {
    id: "cnt-10",
    name: "M Owaiz Sharief",
    usn: "1BY25AI416",
    branch: "AIML",
    contributions: 30,
    points: 219,
    pastPapers: 9,
    notes: 13,
    extras: 8,
    reference: 0,
    upvotes: 19,
  },
  {
    id: "cnt-6",
    name: "Pranay P",
    usn: "1TD24AI130",
    branch: "AIML",
    contributions: 28,
    points: 188,
    pastPapers: 6,
    notes: 16,
    extras: 6,
    reference: 0,
    upvotes: 24,
  },
  {
    id: "cnt-7",
    name: "Hemanth A",
    usn: "1BY25AI412",
    branch: "AIML",
    contributions: 26,
    points: 170,
    pastPapers: 5,
    notes: 16,
    extras: 5,
    reference: 0,
    upvotes: 20,
  },
  {
    id: "cnt-8",
    name: "P Sai Punith",
    usn: "1TD24AI136",
    branch: "AIML",
    contributions: 23,
    points: 150,
    pastPapers: 4,
    notes: 14,
    extras: 5,
    reference: 0,
    upvotes: 15,
  },
  {
    id: "cnt-9",
    name: "K Bhargav",
    usn: "1TD24AI087",
    branch: "AIML",
    contributions: 16,
    points: 104,
    pastPapers: 3,
    notes: 10,
    extras: 3,
    reference: 0,
    upvotes: 8,
  },
];

export const resources: Resource[] = [
{
    "id": "res-12",
    "title": "Reference: Introduction to the Design and Analysis of Algorithms (2nd Edition)",
    "courseId": "c01",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 4,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Gururaj Reddy",
    "uploadDate": "2024-08-01",
    "upvotes": 48,
    "link": "https://www.amazon.in/s?k=Introduction+to+the+Design+and+Analysis+of+Algorithms+2nd+Edition+Anany+Levitin"
  },
{
    "id": "res-21",
    "title": "Reference: Artificial Intelligence: A Modern Approach (4th Edition)",
    "courseId": "c02",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 5,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Jyothiradithya J",
    "uploadDate": "2024-08-01",
    "upvotes": 42,
    "link": "https://www.amazon.in/s?k=Artificial+Intelligence+A+Modern+Approach+4th+Edition+Russell+Norvig"
  },
{
    "id": "res-36",
    "title": "Reference: Engineering Graphics (COMPUTER AIDED ENGINEERING DRAWING) (32nd Edition)",
    "courseId": "c04",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 1,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "V Srisudarshan",
    "uploadDate": "2024-08-01",
    "upvotes": 16,
    "link": "https://www.amazon.in/s?k=Engineering+Graphics+K+R+Gopalakrishna+32nd+Edition"
  },
{
    "id": "res-42",
    "title": "Reference: Computer Vision: Algorithms and Applications (2nd Edition)",
    "courseId": "c05",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 6,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "S Sumedh",
    "uploadDate": "2024-08-01",
    "upvotes": 72,
    "link": "https://www.amazon.in/s?k=Computer+Vision+Algorithms+and+Applications+2nd+Edition+Richard+Szeliski"
  },
{
    "id": "res-46",
    "title": "Reference: Data Communications and Networking (5th Edition)",
    "courseId": "c06",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 5,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "K Bhargav",
    "uploadDate": "2024-08-01",
    "upvotes": 16,
    "link": "https://www.amazon.in/s?k=Data+Communications+and+Networking+5th+Edition+Behrouz+Forouzan"
  },
{
    "id": "res-53",
    "title": "Reference: Fundamentals of Data Structures in C (2nd Edition)",
    "courseId": "c07",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 3,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Pranay P",
    "uploadDate": "2024-08-01",
    "upvotes": 43,
    "link": "https://www.amazon.in/s?k=Fundamentals+of+Data+Structures+in+C+Horowitz+Sahni+2nd+Edition"
  },
{
    "id": "res-64",
    "title": "Reference: Fundamentals of Database Systems (7th Edition)",
    "courseId": "c08",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 4,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "V Sathya Sai",
    "uploadDate": "2024-08-01",
    "upvotes": 20,
    "link": "https://www.amazon.in/s?k=Fundamentals+of+Database+Systems+7th+Edition+Elmasri+Navathe"
  },
{
    "id": "res-76",
    "title": "Reference: Digital Design with an Introduction to Verilog Design (6th Edition)",
    "courseId": "c10",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 3,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "P Sai Punith",
    "uploadDate": "2024-08-01",
    "upvotes": 29,
    "link": "https://www.amazon.in/s?k=Digital+Design+with+an+Introduction+to+Verilog+Design+Mano+Ciletti+6th+Edition"
  },
{
    "id": "res-81",
    "title": "Reference: Professional Writing Skills in English (1st Edition)",
    "courseId": "c11",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 1,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Hemanth A",
    "uploadDate": "2024-08-01",
    "upvotes": 26,
    "link": "https://www.amazon.in/s?k=Professional+Writing+Skills+in+English+Fillip+Learning"
  },
{
    "id": "res-89",
    "title": "Reference: Handbook of Design Thinking: Tips & Tools for How to Design Thinking (1st Edition)",
    "courseId": "c12",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 2,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "M Owaiz Sharief",
    "usn": "1BY25AI416",
    "uploadDate": "2024-08-01",
    "upvotes": 42,
    "link": "https://www.amazon.in/s?k=Handbook+of+Design+Thinking+Christian+Mueller+Roterberg"
  },
{
    "id": "res-97",
    "title": "Reference: Constitution of India (for Competitive Exams) (2022 Edition)",
    "courseId": "c13",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 2,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Jyothiradithya J",
    "uploadDate": "2024-08-01",
    "upvotes": 26,
    "link": "https://www.amazon.in/s?k=Constitution+of+India+for+Competitive+Exams+Naidhruva+Edutech"
  },
{
    "id": "res-112",
    "title": "Reference: Electronic Circuits, Fundamentals & Applications (4th Edition)",
    "courseId": "c15",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 1,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "V Srisudarshan",
    "uploadDate": "2024-08-01",
    "upvotes": 16,
    "link": "https://www.amazon.in/s?k=Electronic+Circuits+Fundamentals+and+Applications+Mike+Tooley"
  },
{
    "id": "res-120",
    "title": "Reference: Automate the Boring Stuff with Python (1st Edition)",
    "courseId": "c16",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 1,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "S Sumedh",
    "uploadDate": "2024-08-01",
    "upvotes": 44,
    "link": "https://www.amazon.in/s?k=Automate+the+Boring+Stuff+with+Python+Al+Sweigart"
  },
{
    "id": "res-128",
    "title": "Reference: Introduction to IoT (1st Edition)",
    "courseId": "c17",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 4,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "K Bhargav",
    "uploadDate": "2024-08-01",
    "upvotes": 44,
    "link": "https://www.amazon.in/s?k=Introduction+to+IoT+Sudip+Misra+Anandarup+Mukherjee+Arijit+Roy"
  },
{
    "id": "res-150",
    "title": "Reference: Higher Engineering Mathematics (Mathematics for CSE Stream – I) (44th Edition)",
    "courseId": "c20",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 1,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Pranay P",
    "uploadDate": "2024-08-01",
    "upvotes": 24,
    "link": "https://www.amazon.in/BS-Grewal-Engineering-Mathematics-2023-24/dp/B0CKBZZ8NH"
  },
{
    "id": "res-160",
    "title": "Reference: Higher Engineering Mathematics (Mathematics-II) (44th Edition)",
    "courseId": "c21",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 2,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "V Sathya Sai",
    "uploadDate": "2024-08-01",
    "upvotes": 25,
    "link": "https://www.amazon.in/BS-Grewal-Engineering-Mathematics-2023-24/dp/B0CKBZZ8NH"
  },
{
    "id": "res-170",
    "title": "Reference: Probability & Statistics for Engineers & Scientists (9th Edition)",
    "courseId": "c22",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 3,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "P Sai Punith",
    "uploadDate": "2024-08-01",
    "upvotes": 32,
    "link": "https://www.amazon.in/s?k=Probability+Statistics+for+Engineers+Scientists+Walpole+9th+Edition"
  },
{
    "id": "res-174",
    "title": "Reference: MongoDB: The Definitive Guide (2nd Edition)",
    "courseId": "c23",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 4,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Hemanth A",
    "uploadDate": "2024-08-01",
    "upvotes": 23,
    "link": "https://www.amazon.in/s?k=MongoDB+The+Definitive+Guide+2nd+Edition+Kristina+Chodorow"
  },
{
    "id": "res-185",
    "title": "Reference: C++ The Complete Reference (4th Edition)",
    "courseId": "c25",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 3,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Gururaj Reddy",
    "uploadDate": "2024-08-01",
    "upvotes": 35,
    "link": "https://www.amazon.in/s?k=C%2B%2B+The+Complete+Reference+4th+Edition+Herbert+Schildt"
  },
{
    "id": "res-196",
    "title": "Reference: Operating System Principles / Operating System Concepts (8th Edition)",
    "courseId": "c26",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 4,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Jyothiradithya J",
    "uploadDate": "2024-08-01",
    "upvotes": 38,
    "link": "https://www.amazon.in/Operating-System-Concepts-Abraham-Silberschatz/dp/B074G46V8F"
  },
{
    "id": "res-204",
    "title": "Reference: Operations Research (Revised Edition)",
    "courseId": "c27",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 5,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "V Srisudarshan",
    "uploadDate": "2024-08-01",
    "upvotes": 28,
    "link": "https://www.amazon.in/s?k=Operations+Research+S+D+Sharma+Kedar+Nath+Ram+Nath"
  },
{
    "id": "res-213",
    "title": "Reference: Computer Fundamentals and Programming in C (2nd Edition)",
    "courseId": "c28",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 1,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "S Sumedh",
    "uploadDate": "2024-08-01",
    "upvotes": 62,
    "link": "https://www.amazon.in/s?k=Computer+Fundamentals+and+Programming+in+C+Reema+Thareja+2nd+Edition"
  },
{
    "id": "res-217",
    "title": "Reference: Version Control with Git (3rd Edition)",
    "courseId": "c29",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 3,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Gururaj Reddy",
    "uploadDate": "2024-08-01",
    "upvotes": 35,
    "link": "https://www.amazon.in/s?k=Version+Control+with+Git+3rd+Edition+Prem+Kumar+Ponuthorai+Jon+Loeliger"
  },
{
    "id": "res-230",
    "title": "Reference: Research Methodology: Methods and Techniques (4th Edition)",
    "courseId": "c31",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 5,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Jyothiradithya J",
    "uploadDate": "2024-08-01",
    "upvotes": 35,
    "link": "https://www.amazon.in/s?k=Research+Methodology+Kothari+Gaurav+Garg"
  },
{
    "id": "res-243",
    "title": "Reference: Software Engineering (9th Edition)",
    "courseId": "c33",
    "type": "reference",
    "academicYear": "Prescribed Syllabus",
    "semester": 4,
    "fileType": "Link",
    "fileSizeMb": 0,
    "contributor": "Gururaj Reddy",
    "uploadDate": "2024-08-01",
    "upvotes": 41,
    "link": "https://www.amazon.in/s?k=Software+Engineering+9th+Edition+Ian+Sommerville"
  }
];

export const releases: Release[] = [
  {
    version: "v1.4.0",
    date: "2026",
    tag: "Minor",
    features: [
      "Added the Honor Roll points calculator so contributors can estimate points before uploading",
      "Introduced course-level resource tabs for faster filtering by type",
    ],
    improvements: [
      "Search now matches course names for faster lookup",
      "Resource cards show file size and contributor at a glance",
    ],
    fixes: [
      "Fixed an issue where the mobile navigation stayed open after selecting a page",
    ],
  },
  {
    version: "v1.3.1",
    date: "2026",
    tag: "Patch",
    features: [],
    improvements: [
      "Bookshelf cards now show edition information for textbooks",
    ],
    fixes: [
      "Corrected sorting order on the Honor Roll all-time tab",
      "Fixed broken hover state on category cards in Safari",
    ],
  },
  {
    version: "v1.3.0",
    date: "2026",
    tag: "Minor",
    features: [
      "Launched the Bookshelf, a dedicated home for reference textbooks",
      "Added anonymous contribution option on the Contribute form",
    ],
    improvements: [
      "Reworked the homepage hero and search for faster course lookup",
    ],
    fixes: [],
  },
  {
    version: "v1.0.0",
    date: "2026",
    tag: "Major",
    features: [
      "ARCHIVE rebuilt from the ground up for BMSIT with a new design system",
      "Introduced the Honor Roll leaderboard and contribution points",
    ],
    improvements: [],
    fixes: [],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function getCourseResources(courseId: string): Resource[] {
  return resources.filter((r) => r.courseId === courseId);
}
