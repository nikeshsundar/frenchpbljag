import json

# Load existing data
with open('src/data/universities.json', 'r', encoding='utf-8') as f:
    universities = json.load(f)

# List of additional universities (31-100)
new_universities = [
    {
        "name": "Université de Lorraine",
        "city": "Nancy",
        "region": "Grand Est",
        "programs": ["Engineering", "Materials Science", "Computer Science", "Energy"],
        "tuitionFees": 2900,
        "qsRanking": 801,
        "strengths": ["Innovation", "Student Life", "Engineering"],
        "website": "https://www.univ-lorraine.fr",
        "image": "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800"
    },
    {
        "name": "Université de Poitiers",
        "city": "Poitiers",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Law", "Psychology", "Languages", "Economics"],
        "tuitionFees": 2700,
        "qsRanking": 1001,
        "strengths": ["Oldest Universities", "Student City", "Affordable"],
        "website": "https://www.univ-poitiers.fr",
        "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
    },
    {
        "name": "Université de Tours",
        "city": "Tours",
        "region": "Centre-Val de Loire",
        "programs": ["Medicine", "History", "Languages", "Renaissance Studies"],
        "tuitionFees": 2800,
        "qsRanking": 1001,
        "strengths": ["Loire Valley", "Culture", "Quality of Life"],
        "website": "https://www.univ-tours.fr",
        "image": "https://images.unsplash.com/photo-1596367407372-96cb2913ce72?w=800"
    },
    {
        "name": "IMT Atlantique",
        "city": "Nantes",
        "region": "Pays de la Loire",
        "programs": ["Engineering", "Nuclear Energy", "Digital Tech", "Environment"],
        "tuitionFees": 8500,
        "qsRanking": 350,
        "strengths": ["Elite Engineering", "Industry Links", "Innovation"],
        "website": "https://www.imt-atlantique.fr",
        "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
    },
    {
        "name": "Audencia Business School",
        "city": "Nantes",
        "region": "Pays de la Loire",
        "programs": ["Management", "Finance", "Marketing", "Supply Chain"],
        "tuitionFees": 22000,
        "qsRanking": 300,
        "strengths": ["Top Business School", "CSR Focus", "Career Services"],
        "website": "https://www.audencia.com",
        "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800"
    },
    {
        "name": "NEOMA Business School",
        "city": "Reims",
        "region": "Grand Est",
        "programs": ["Business", "Luxury Management", "Finance", "Marketing"],
        "tuitionFees": 19000,
        "qsRanking": 350,
        "strengths": ["Luxury Network", "Digital Campus", "Alumni"],
        "website": "https://www.neoma-bs.fr",
        "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
    },
    {
        "name": "KEDGE Business School",
        "city": "Bordeaux",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Supply Chain", "Wine Management", "Finance", "Business"],
        "tuitionFees": 18500,
        "qsRanking": 400,
        "strengths": ["Supply Chain Expert", "Wine Business", "Modern Campus"],
        "website": "https://www.kedge.edu",
        "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
    },
    {
        "name": "Université de Caen Normandie",
        "city": "Caen",
        "region": "Normandy",
        "programs": ["Law", "History", "Geography", "Biology"],
        "tuitionFees": 2700,
        "qsRanking": 1100,
        "strengths": ["History Focus", "Student Life", "Campus"],
        "website": "https://www.unicaen.fr",
        "image": "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
    },
    {
        "name": "Université de Franche-Comté",
        "city": "Besançon",
        "region": "Bourgogne-Franche-Comté",
        "programs": ["Linguistics", "Engineering", "Time-Frequency", "Optics"],
        "tuitionFees": 2600,
        "qsRanking": 900,
        "strengths": ["Applied Languages", "Engineering", "Nature"],
        "website": "https://www.univ-fcomte.fr",
        "image": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800"
    },
    {
        "name": "Université de Bourgogne",
        "city": "Dijon",
        "region": "Bourgogne-Franche-Comté",
        "programs": ["Food Science", "Wine", "History", "Literature"],
        "tuitionFees": 2800,
        "qsRanking": 850,
        "strengths": ["Gastronomy", "Vineyards", "Cultural Heritage"],
        "website": "https://www.u-bourgogne.fr",
        "image": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800"
    },
    {
        "name": "CY Cergy Paris Université",
        "city": "Cergy",
        "region": "Île-de-France",
        "programs": ["Economics", "Management", "Education", "Languages"],
        "tuitionFees": 3000,
        "qsRanking": 900,
        "strengths": ["Close to Paris", "Modern", "Dynamic"],
        "website": "https://www.cyu.fr",
        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    },
    {
        "name": "Université Gustave Eiffel",
        "city": "Champs-sur-Marne",
        "region": "Île-de-France",
        "programs": ["Urban Planning", "Civil Engineering", "Transport", "Sociology"],
        "tuitionFees": 3200,
        "qsRanking": 800,
        "strengths": ["Sustainable Cities", "Transport", "Innovation"],
        "website": "https://www.univ-gustave-eiffel.fr",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    },
    {
        "name": "Université Paris-Est Créteil (UPEC)",
        "city": "Créteil",
        "region": "Île-de-France",
        "programs": ["Medicine", "Law", "Economics", "Education"],
        "tuitionFees": 3000,
        "qsRanking": 950,
        "strengths": ["Diversity", "Medical Faculty", "Accessibility"],
        "website": "https://www.u-pec.fr",
        "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
    },
    {
        "name": "Université Sorbonne Paris Nord",
        "city": "Villetaneuse",
        "region": "Île-de-France",
        "programs": ["Communication", "Health", "Law", "Computer Science"],
        "tuitionFees": 2900,
        "qsRanking": 1000,
        "strengths": ["Communication", "Health Sciences", "Social Impact"],
        "website": "https://www.univ-spn.fr",
        "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
    },
    {
        "name": "Université de Pau et des Pays de l'Adour",
        "city": "Pau",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Energy", "Environment", "Geography", "Law"],
        "tuitionFees": 2700,
        "qsRanking": 1100,
        "strengths": ["Energy Transition", "Pyrenees", "Quality of Life"],
        "website": "https://www.univ-pau.fr",
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    },
    {
        "name": "Université de Perpignan Via Domitia",
        "city": "Perpignan",
        "region": "Occitanie",
        "programs": ["Solar Energy", "Marine Biology", "Tourism", "Catalan Studies"],
        "tuitionFees": 2600,
        "qsRanking": 1200,
        "strengths": ["Renewable Energy", "Mediterranean", "Border City"],
        "website": "https://www.univ-perp.fr",
        "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
    },
    {
        "name": "Université de Limoges",
        "city": "Limoges",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Ceramics", "Materials", "Law", "Health"],
        "tuitionFees": 2700,
        "qsRanking": 1000,
        "strengths": ["Materials Science", "Affordable", "Ceramics"],
        "website": "https://www.unilim.fr",
        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    },
    {
        "name": "Université de Bretagne Occidentale",
        "city": "Brest",
        "region": "Brittany",
        "programs": ["Marine Sciences", "Oceanography", "Engineering", "Law"],
        "tuitionFees": 2800,
        "qsRanking": 900,
        "strengths": ["Ocean Sciences", "Maritime", "Brittany Coast"],
        "website": "https://www.univ-brest.fr",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    },
    {
        "name": "Université de Bretagne Sud",
        "city": "Lorient",
        "region": "Brittany",
        "programs": ["Cybersecurity", "Materials", "Social Sciences"],
        "tuitionFees": 2700,
        "qsRanking": 1200,
        "strengths": ["Cybersecurity", "Sailing", "Innovation"],
        "website": "https://www.univ-ubs.fr",
        "image": "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800"
    },
    {
        "name": "Université de La Rochelle",
        "city": "La Rochelle",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Environment", "Coastal Management", "Digital", "Law"],
        "tuitionFees": 2800,
        "qsRanking": 1100,
        "strengths": ["Smart Urban", "Coastal", "Student Life"],
        "website": "https://www.univ-larochelle.fr",
        "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
    },
    {
        "name": "Université d'Orléans",
        "city": "Orléans",
        "region": "Centre-Val de Loire",
        "programs": ["Chemistry", "Engineering", "Geology", "History"],
        "tuitionFees": 2800,
        "qsRanking": 1000,
        "strengths": ["Geosciences", "Chemistry", "Proximity to Paris"],
        "website": "https://www.univ-orleans.fr",
        "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
    },
    {
        "name": "Université du Mans",
        "city": "Le Mans",
        "region": "Pays de la Loire",
        "programs": ["Acoustics", "Insurance", "Risk Management", "Literature"],
        "tuitionFees": 2700,
        "qsRanking": 1200,
        "strengths": ["Acoustics Excellence", "Insurance Hub", "Campus"],
        "website": "https://www.univ-lemans.fr",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    },
    {
        "name": "Université de Technologie de Compiègne (UTC)",
        "city": "Compiègne",
        "region": "Hauts-de-France",
        "programs": ["Engineering", "Bioengineering", "Computer Science", "Mechanics"],
        "tuitionFees": 3500,
        "qsRanking": 450,
        "strengths": ["Engineering Model", "Innovation", "Industry"],
        "website": "https://www.utc.fr",
        "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
    },
    {
        "name": "Université de Technologie de Troyes (UTT)",
        "city": "Troyes",
        "region": "Grand Est",
        "programs": ["Systems Engineering", "Informatics", "Materials"],
        "tuitionFees": 3200,
        "qsRanking": 600,
        "strengths": ["Systems Tech", "Sustainable", "International"],
        "website": "https://www.utt.fr",
        "image": "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800"
    },
    {
        "name": "Université de Technologie de Belfort-Montbéliard",
        "city": "Belfort",
        "region": "Bourgogne-Franche-Comté",
        "programs": ["Mechanical Engineering", "Computer Science", "Energy"],
        "tuitionFees": 3000,
        "qsRanking": 700,
        "strengths": ["Transport", "Energy", "Industry"],
        "website": "https://www.utbm.fr",
        "image": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800"
    },
    {
        "name": "IMT Mines Albi",
        "city": "Albi",
        "region": "Occitanie",
        "programs": ["Industrial Engineering", "Pharmaceutical Engineering", "Energy"],
        "tuitionFees": 3500,
        "qsRanking": 800,
        "strengths": ["Process Engineering", "Small Class Sizes", "Heritage City"],
        "website": "https://www.imt-mines-albi.fr",
        "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
    },
    {
        "name": "IMT Mines Alès",
        "city": "Alès",
        "region": "Occitanie",
        "programs": ["Civil Engineering", "Environment", "Risk Management"],
        "tuitionFees": 3500,
        "qsRanking": 850,
        "strengths": ["Risk Management", "Materials", "Environment"],
        "website": "https://www.imt-mines-ales.fr",
        "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800"
    },
    {
        "name": "IMT Nord Europe",
        "city": "Lille",
        "region": "Hauts-de-France",
        "programs": ["Digital Tech", "Energy", "Materials", "Industry 4.0"],
        "tuitionFees": 3800,
        "qsRanking": 750,
        "strengths": ["Digital", "Eco-materials", "Strategic Location"],
        "website": "https://www.imt-nord-europe.fr",
        "image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
    },
    {
        "name": "Grenoble École de Management",
        "city": "Grenoble",
        "region": "Auvergne-Rhône-Alpes",
        "programs": ["International Business", "Technology Management", "Finance"],
        "tuitionFees": 18000,
        "qsRanking": 350,
        "strengths": ["Tech Management", "Innovation", "Entrepreneurship"],
        "website": "https://www.grenoble-em.com",
        "image": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800"
    },
    {
        "name": "Rennes School of Business",
        "city": "Rennes",
        "region": "Brittany",
        "programs": ["Global Business", "Supply Chain", "Finance"],
        "tuitionFees": 16000,
        "qsRanking": 450,
        "strengths": ["Global Faculty", "International Focus", "Multicultural"],
        "website": "https://www.rennes-sb.com",
        "image": "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800"
    },
    {
        "name": "Montpellier Business School",
        "city": "Montpellier",
        "region": "Occitanie",
        "programs": ["Management", "Finance", "Marketing", "Sustainability"],
        "tuitionFees": 15000,
        "qsRanking": 500,
        "strengths": ["Diversity", "CSR", "Apprenticeship"],
        "website": "https://www.montpellier-bs.com",
        "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
    },
    {
        "name": "Burgundy School of Business",
        "city": "Dijon",
        "region": "Bourgogne-Franche-Comté",
        "programs": ["Wine Management", "Arts Management", "Finance"],
        "tuitionFees": 14000,
        "qsRanking": 600,
        "strengths": ["Wine Business", "Arts & Culture", "Personal Support"],
        "website": "https://www.bsb-education.com",
        "image": "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
    },
    {
        "name": "EM Strasbourg Business School",
        "city": "Strasbourg",
        "region": "Grand Est",
        "programs": ["European Business", "Management", "Marketing"],
        "tuitionFees": 12000,
        "qsRanking": 650,
        "strengths": ["University Affiliated", "European Hub", "Values"],
        "website": "https://www.em-strasbourg.com",
        "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
    },
    {
        "name": "ICN Business School",
        "city": "Nancy",
        "region": "Grand Est",
        "programs": ["Creative Management", "Luxury", "Finance"],
        "tuitionFees": 13000,
        "qsRanking": 700,
        "strengths": ["Creativity", "Art-Tech-Management", "Personal Development"],
        "website": "https://www.icn-artem.com",
        "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
    },
    {
        "name": "Institut Paul Bocuse",
        "city": "Lyon",
        "region": "Auvergne-Rhône-Alpes",
        "programs": ["Culinary Arts", "Hospitality Management", "Food Service"],
        "tuitionFees": 20000,
        "qsRanking": 100,
        "strengths": ["Culinary Excellence", "Hospitality", "Prestige"],
        "website": "https://www.institutpaulbocuse.com",
        "image": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800"
    },
    {
        "name": "Vatel Hotel & Tourism Business School",
        "city": "Bordeaux",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Hotel Management", "Tourism", "Hospitality"],
        "tuitionFees": 15000,
        "qsRanking": 150,
        "strengths": ["Hotel Management", "Practical Training", "Global"],
        "website": "https://www.vatel.com",
        "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
    },
    {
        "name": "Ferrières School",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Luxury Hospitality", "Gastronomy", "Events"],
        "tuitionFees": 22000,
        "qsRanking": 200,
        "strengths": ["Luxury", "Excellence", "Chateau Campus"],
        "website": "https://www.ferrieres-paris.com",
        "image": "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800"
    },
    {
        "name": "Le Cordon Bleu Paris",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Culinary Arts", "Pastry", "Hospitality Management"],
        "tuitionFees": 25000,
        "qsRanking": 100,
        "strengths": ["Culinary World Leader", "Paris Location", "Network"],
        "website": "https://www.cordonbleu.edu/paris",
        "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
    },
    {
        "name": "Paris School of Business",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Management", "Marketing", "Data Analytics"],
        "tuitionFees": 12000,
        "qsRanking": 600,
        "strengths": ["Central Paris", "International", "Career"],
        "website": "https://www.psbedu.paris",
        "image": "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
    },
    {
        "name": "ISC Paris",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Business", "Luxury", "Sports Management"],
        "tuitionFees": 11500,
        "qsRanking": 700,
        "strengths": ["Student Enterprises", "Network", "Paris"],
        "website": "https://www.iscparis.com",
        "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
    },
    {
        "name": "INSEEC",
        "city": "Bordeaux",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Digital", "Wine", "Real Estate", "Finance"],
        "tuitionFees": 10500,
        "qsRanking": 750,
        "strengths": ["Professional Focus", "Network", "Specializations"],
        "website": "https://www.inseec.com",
        "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
    },
    {
        "name": "EIPHI Graduate School",
        "city": "Dijon",
        "region": "Bourgogne-Franche-Comté",
        "programs": ["Physics", "Engineering", "Photonics"],
        "tuitionFees": 3000,
        "qsRanking": 800,
        "strengths": ["Research", "Physics", "International"],
        "website": "https://graduateschool.eiphi.ubfc.fr",
        "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
    },
    {
        "name": "ISAE-SUPAERO",
        "city": "Toulouse",
        "region": "Occitanie",
        "programs": ["Aerospace Engineering", "Space Systems", "Embedded Systems"],
        "tuitionFees": 12000,
        "qsRanking": 100,
        "strengths": ["World Top Aerospace", "Space Industry", "Research"],
        "website": "https://www.isae-supaero.fr",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
    },
    {
        "name": "ENAC",
        "city": "Toulouse",
        "region": "Occitanie",
        "programs": ["Aviation", "Air Traffic Control", "Piloting"],
        "tuitionFees": 8000,
        "qsRanking": 150,
        "strengths": ["Civil Aviation", "Piloting", "Air Transport"],
        "website": "https://www.enac.fr",
        "image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
    },
    {
        "name": "École des Ponts ParisTech",
        "city": "Champs-sur-Marne",
        "region": "Île-de-France",
        "programs": ["Civil Engineering", "Transport", "Economics", "Environment"],
        "tuitionFees": 6000,
        "qsRanking": 174,
        "strengths": ["Civil Engineering", "Elite", "Urban Planning"],
        "website": "https://www.ecoledesponts.fr",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    },
    {
        "name": "Télécom Paris",
        "city": "Palaiseau",
        "region": "Île-de-France",
        "programs": ["Telecommunications", "Data Science", "Cybersecurity", "AI"],
        "tuitionFees": 5500,
        "qsRanking": 200,
        "strengths": ["Digital Tech", "Innovation", "Paris-Saclay"],
        "website": "https://www.telecom-paris.fr",
        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    },
    {
        "name": "ENSTA Paris",
        "city": "Palaiseau",
        "region": "Île-de-France",
        "programs": ["Energy", "Mobility", "Systems Engineering", "Math"],
        "tuitionFees": 5000,
        "qsRanking": 250,
        "strengths": ["Systems Engineering", "Defense", "Energy"],
        "website": "https://www.ensta-paris.fr",
        "image": "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800"
    },
    {
        "name": "ESPCI Paris",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Physics", "Chemistry", "Biology", "Engineering"],
        "tuitionFees": 3500,
        "qsRanking": 300,
        "strengths": ["Research", "Innovation", "Nobel Prize History"],
        "website": "https://www.espci.psl.eu",
        "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
    },
    {
        "name": "Chimie ParisTech",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Chemistry", "Materials", "Process Engineering"],
        "tuitionFees": 3500,
        "qsRanking": 350,
        "strengths": ["Chemistry", "Industry", "Research"],
        "website": "https://www.chimieparistech.psl.eu",
        "image": "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800"
    },
    {
        "name": "Arts et Métiers (ENSAM)",
        "city": "Paris",
        "region": "Île-de-France",
        "programs": ["Mechanical Engineering", "Industrial Engineering", "Energy"],
        "tuitionFees": 3000,
        "qsRanking": 400,
        "strengths": ["Technology", "Industry", "Alumni Network"],
        "website": "https://artsetmetiers.fr",
        "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
    },
    {
        "name": "IOGS (Institut d'Optique)",
        "city": "Palaiseau",
        "region": "Île-de-France",
        "programs": ["Optics", "Photonics", "Physics"],
        "tuitionFees": 3000,
        "qsRanking": 500,
        "strengths": ["Optics", "Photonics", "Research"],
        "website": "https://www.institutoptique.fr",
        "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
    },
    {
        "name": "ENSAE Paris",
        "city": "Palaiseau",
        "region": "Île-de-France",
        "programs": ["Statistics", "Economics", "Data Science", "Finance"],
        "tuitionFees": 4000,
        "qsRanking": 450,
        "strengths": ["Data Science", "Statistics", "Economics"],
        "website": "https://www.ensae.fr",
        "image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
    },
    {
        "name": "AgroParisTech",
        "city": "Palaiseau",
        "region": "Île-de-France",
        "programs": ["Life Sciences", "Agronomy", "Food Science", "Environment"],
        "tuitionFees": 3500,
        "qsRanking": 200,
        "strengths": ["Life Sciences", "Sustainability", "Food"],
        "website": "https://www.agroparistech.fr",
        "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800"
    },
    {
        "name": "Université Paris 8",
        "city": "Saint-Denis",
        "region": "Île-de-France",
        "programs": ["Arts", "Humanities", "Social Sciences", "Philosophy"],
        "tuitionFees": 2800,
        "qsRanking": 1000,
        "strengths": ["Arts", "Critical Thinking", "Experimental"],
        "website": "https://www.univ-paris8.fr",
        "image": "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800"
    },
    {
        "name": "Université Paris Nanterre",
        "city": "Nanterre",
        "region": "Île-de-France",
        "programs": ["Law", "Psychology", "Languages", "Humanities"],
        "tuitionFees": 2800,
        "qsRanking": 1000,
        "strengths": ["Campus Life", "Humanities", "Sport"],
        "website": "https://www.parisnanterre.fr",
        "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
    },
    {
        "name": "Université de Versailles Saint-Quentin",
        "city": "Versailles",
        "region": "Île-de-France",
        "programs": ["Environment", "Space", "Medicine", "Science"],
        "tuitionFees": 3000,
        "qsRanking": 600,
        "strengths": ["Climate Science", "Versailles", "Health"],
        "website": "https://www.uvsq.fr",
        "image": "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
    },
    {
        "name": "Université d'Évry",
        "city": "Évry",
        "region": "Île-de-France",
        "programs": ["Genomics", "Biology", "Sociology", "Management"],
        "tuitionFees": 2800,
        "qsRanking": 1100,
        "strengths": ["Genetics", "Biotech", "Innovation"],
        "website": "https://www.univ-evry.fr",
        "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
    },
    {
        "name": "Université de Corse Pasquale Paoli",
        "city": "Corte",
        "region": "Corsica",
        "programs": ["Environmental Science", "Corsican Studies", "Law", "Tourism"],
        "tuitionFees": 2600,
        "qsRanking": 1200,
        "strengths": ["Environment", "Island Identity", "Research"],
        "website": "https://www.univ-corse.fr",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    },
    {
        "name": "Université de la Réunion",
        "city": "Saint-Denis",
        "region": "Réunion",
        "programs": ["Tropical Environment", "Health", "Law", "Languages"],
        "tuitionFees": 2700,
        "qsRanking": 1100,
        "strengths": ["Tropical Studies", "Diversity", "Indian Ocean"],
        "website": "https://www.univ-reunion.fr",
        "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
    },
    {
        "name": "Université des Antilles",
        "city": "Pointe-à-Pitre",
        "region": "Guadeloupe/Martinique",
        "programs": ["Caribbean Studies", "Biology", "Law", "Economics"],
        "tuitionFees": 2700,
        "qsRanking": 1200,
        "strengths": ["Caribbean", "Biodiversity", "Regional"],
        "website": "https://www.univ-antilles.fr",
        "image": "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800"
    },
    {
        "name": "Université de Guyane",
        "city": "Cayenne",
        "region": "French Guiana",
        "programs": ["Amazonian Studies", "Space", "Health", "Law"],
        "tuitionFees": 2600,
        "qsRanking": 1300,
        "strengths": ["Amazon", "Biodiversity", "Space Center"],
        "website": "https://www.univ-guyane.fr",
        "image": "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800"
    },
    {
        "name": "Université de la Polynésie Française",
        "city": "Punaauia",
        "region": "French Polynesia",
        "programs": ["Pacific Studies", "Marine Biology", "Law", "Management"],
        "tuitionFees": 2800,
        "qsRanking": 1300,
        "strengths": ["Pacific", "Marine", "Culture"],
        "website": "https://www.upf.pf",
        "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
    },
    {
        "name": "Université de Nouvelle-Calédonie",
        "city": "Nouméa",
        "region": "New Caledonia",
        "programs": ["Pacific Environment", "Law", "Nickel Industry", "Education"],
        "tuitionFees": 2800,
        "qsRanking": 1300,
        "strengths": ["Mining", "Environment", "Regional"],
        "website": "https://www.unc.nc",
        "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
    },
    {
        "name": "INSA Toulouse",
        "city": "Toulouse",
        "region": "Occitanie",
        "programs": ["Biotech", "Civil Engineering", "Computer Science", "Physics"],
        "tuitionFees": 4000,
        "qsRanking": 500,
        "strengths": ["Biotech", "Engineering", "Student Life"],
        "website": "https://www.insa-toulouse.fr",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
    },
    {
        "name": "INSA Rennes",
        "city": "Rennes",
        "region": "Brittany",
        "programs": ["Computer Science", "Civil Engineering", "Materials", "Comms"],
        "tuitionFees": 3800,
        "qsRanking": 600,
        "strengths": ["Digital", "Materials", "Campus"],
        "website": "https://www.insa-rennes.fr",
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
    },
    {
        "name": "INSA Rouen",
        "city": "Rouen",
        "region": "Normandy",
        "programs": ["Chemical Engineering", "Energy", "Risk", "Math"],
        "tuitionFees": 3800,
        "qsRanking": 650,
        "strengths": ["Chemistry", "Risk Management", "Energy"],
        "website": "https://www.insa-rouen.fr",
        "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"
    },
    {
        "name": "INSA Strasbourg",
        "city": "Strasbourg",
        "region": "Grand Est",
        "programs": ["Architecture", "Civil Engineering", "Surveying", "Mechanics"],
        "tuitionFees": 3800,
        "qsRanking": 700,
        "strengths": ["Architecture & Engineering", "Border Region", "Tech"],
        "website": "https://www.insa-strasbourg.fr",
        "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
    },
    {
        "name": "INSA Hauts-de-France",
        "city": "Valenciennes",
        "region": "Hauts-de-France",
        "programs": ["Transport", "Digital", "Mechanics", "Industrial"],
        "tuitionFees": 3500,
        "qsRanking": 800,
        "strengths": ["Transport", "Mobility", "Industry"],
        "website": "https://www.insa-hautsdefrance.fr",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    },
    {
        "name": "INSA Centre Val de Loire",
        "city": "Blois/Bourges",
        "region": "Centre-Val de Loire",
        "programs": ["Risk", "Security", "Industrial Systems", "Energy"],
        "tuitionFees": 3500,
        "qsRanking": 850,
        "strengths": ["Risk Engineering", "Security", "Regional"],
        "website": "https://www.insa-centrevaldeloire.fr",
        "image": "https://images.unsplash.com/photo-1596367407372-96cb2913ce72?w=800"
    },
    {
        "name": "Sciences Po Bordeaux",
        "city": "Bordeaux",
        "region": "Nouvelle-Aquitaine",
        "programs": ["Political Science", "International Relations", "Public Affairs"],
        "tuitionFees": 6000,
        "qsRanking": 400,
        "strengths": ["Politics", "International", "Africa Focus"],
        "website": "https://www.sciencespobordeaux.fr",
        "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800"
    }
]

# Append new universities to the list
start_id = 31
for i, uni in enumerate(new_universities):
    uni['id'] = start_id + i
    # Add common fields if missing
    if 'minCGPA' not in uni:
        uni['minCGPA'] = 7.0
    if 'programLength' not in uni:
        uni['programLength'] = "2-3 years"
    if 'languageRequirement' not in uni:
        uni['languageRequirement'] = "B2 French or English"
    if 'applicationDeadline' not in uni:
        uni['applicationDeadline'] = "May 15"
    if 'internationalStudents' not in uni:
        uni['internationalStudents'] = 3000

universities.extend(new_universities)

# Save updated data
with open('src/data/universities.json', 'w', encoding='utf-8') as f:
    json.dump(universities, f, indent=2, ensure_ascii=False)

print(f"Successfully added {len(new_universities)} universities. Total: {len(universities)}")
