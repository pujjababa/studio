/**
 * @fileOverview A local data source for festival dates.
 * This file contains manually curated festival data to ensure accuracy,
 * especially when external APIs or AI models are inconsistent.
 * This acts as a local, reliable database for the application.
 */

export interface FestivalData {
    name: string;
    // The date in YYYY-MM-DD format.
    date: string;
    // New fields to remove AI dependency
    mainDescription: string;
    summary: string;
    rituals: string;
    calculationMethod: string;
}

// We can add more festivals and years here over time.
// This data is based on reliable sources like Drik Panchang.
export const festivalDatabase: FestivalData[] = [
    // 2024
    { 
        name: 'Raksha Bandhan', 
        date: '2024-08-19',
        mainDescription: "Raksha Bandhan is a festival that celebrates the bond of love between brothers and sisters. Sisters tie a sacred thread called a 'rakhi' on their brothers' wrists, symbolizing their love and prayers for their well-being.",
        summary: "The key ritual involves the sister tying the rakhi. The Purnima Tithi is the most important factor, and the ceremony should ideally be performed during the Aparahna time of day.",
        rituals: "1. The sister prepares a thali with a rakhi, diya, sweets, and roli-chawal.\n2. She applies a tilak on her brother's forehead, performs aarti, and ties the rakhi.\n3. The brother gives a gift to the sister and vows to protect her.",
        calculationMethod: "1. Raksha Bandhan is celebrated on the Purnima (Full Moon) day of the Shravana month.\n2. The ideal time to tie the rakhi is during the Aparahna time, which is late afternoon according to the Hindu division of the day.\n3. Care is taken to avoid the Bhadra period, which is considered inauspicious for this ritual."
    },
    { 
        name: 'Krishna Janmashtami', 
        date: '2024-08-26',
        mainDescription: "Krishna Janmashtami celebrates the birth of Lord Krishna. Devotees observe fasts, sing devotional songs, and perform pujas at midnight, believed to be the time of Krishna's birth.",
        summary: "The festival is celebrated on the Ashtami (8th day) of the Krishna Paksha (dark fortnight) in the month of Bhadrapada. The celebration peaks at midnight with the birth ceremony of Lord Krishna.",
        rituals: "1. Devotees fast throughout the day.\n2. Temples and homes are decorated, and scenes from Krishna's life are depicted.\n3. At midnight, an idol of infant Krishna is bathed, clothed, and placed in a cradle. Aarti and bhajans are performed.",
        calculationMethod: "1. The festival date is determined by the Ashtami Tithi of the Krishna Paksha in the month of Bhadrapada.\n2. The puja is specifically performed at midnight (Nishita Kaal), as this is considered the exact time of Lord Krishna's birth.\n3. The Rohini Nakshatra is also highly significant; if it aligns with the Ashtami Tithi, the celebration is considered even more auspicious."
    },
    { 
        name: 'Janmashtami', 
        date: '2024-08-26',
        mainDescription: "Krishna Janmashtami celebrates the birth of Lord Krishna. Devotees observe fasts, sing devotional songs, and perform pujas at midnight, believed to be the time of Krishna's birth.",
        summary: "The festival is celebrated on the Ashtami (8th day) of the Krishna Paksha (dark fortnight) in the month of Bhadrapada. The celebration peaks at midnight with the birth ceremony of Lord Krishna.",
        rituals: "1. Devotees fast throughout the day.\n2. Temples and homes are decorated, and scenes from Krishna's life are depicted.\n3. At midnight, an idol of infant Krishna is bathed, clothed, and placed in a cradle. Aarti and bhajans are performed.",
        calculationMethod: "1. The festival date is determined by the Ashtami Tithi of the Krishna Paksha in the month of Bhadrapada.\n2. The puja is specifically performed at midnight (Nishita Kaal), as this is considered the exact time of Lord Krishna's birth.\n3. The Rohini Nakshatra is also highly significant; if it aligns with the Ashtami Tithi, the celebration is considered even more auspicious."
    },
    { 
        name: 'Ganesh Chaturthi', 
        date: '2024-09-07',
        mainDescription: "Ganesh Chaturthi is a grand festival celebrating the birth of Lord Ganesha, the god of new beginnings and remover of obstacles. It involves installing and worshipping Ganesha idols.",
        summary: "The festival begins on the Chaturthi Tithi of the Shukla Paksha in the month of Bhadrapada. The main puja is performed during the Madhyahna period of the day.",
        rituals: "1. Clay idols of Lord Ganesha are installed in homes and public pandals.\n2. Prayers are offered daily, along with modak (a sweet dumpling), which is considered Ganesha's favorite food.\n3. The festival concludes with the immersion (visarjan) of the idol in a body of water.",
        calculationMethod: "1. The festival is observed on the Chaturthi Tithi of the Shukla Paksha in the month of Bhadrapada.\n2. The main puja (Sthapana) is performed during the Madhyahna Kaal (midday period), as it is believed Lord Ganesha was born during this time.\n3. It is strictly advised not to sight the moon on this day, as it is believed to cause false accusations."
    },
    { 
        name: 'Navratri', 
        date: '2024-10-03',
        mainDescription: "Navratri, meaning 'nine nights', is a festival dedicated to the worship of the nine forms of Goddess Durga. It is a period of fasting, prayer, dance (Garba), and celebration.",
        summary: "Sharad Navratri begins on the Pratipada Tithi of the Shukla Paksha in the month of Ashwina. It spans nine nights, with each day dedicated to a different form of the Goddess.",
        rituals: "1. A Kalash Sthapana is performed on the first day.\n2. Devotees often observe fasts, consuming only specific foods.\n3. Each evening involves aarti and prayers. In many parts of India, community dances like Garba and Dandiya Raas are held.",
        calculationMethod: "1. Navratri begins on the Pratipada Tithi (first day) of the Shukla Paksha of the lunar month of Ashwina.\n2. The festival continues for nine consecutive days, following the lunar calendar.\n3. The culmination is on the tenth day, celebrated as Dussehra or Vijayadashami."
    },
    { 
        name: 'Dussehra', 
        date: '2024-10-12',
        mainDescription: "Dussehra, also known as Vijayadashami, marks the victory of Lord Rama over the demon king Ravana, symbolizing the triumph of good over evil. It also celebrates Goddess Durga's victory over Mahishasura.",
        summary: "Celebrated on the Dashami Tithi (10th day) of the Shukla Paksha in the month of Ashwina, it concludes the nine days of Navratri.",
        rituals: "1. Effigies of Ravana, his brother Kumbhakarna, and his son Meghanada are burnt in large public grounds.\n2. In many parts of India, it is a day for worshipping weapons and tools (Shastra Puja).\n3. Processions carrying idols of Goddess Durga for immersion are common.",
        calculationMethod: "1. Dussehra is celebrated on the Dashami Tithi of the Shukla Paksha in the month of Ashwina.\n2. The Vijay Muhurat (an auspicious time during the afternoon) is considered the most potent time to begin new ventures.\n3. The Aparahna time is when most of the key rituals, including the burning of effigies, are performed."
    },
    { 
        name: 'Diwali', 
        date: '2024-11-01',
        mainDescription: "Diwali, the festival of lights, is one of the most significant Hindu festivals. It symbolizes the victory of light over darkness and good over evil. Homes are decorated with lamps (diyas) and prayers are offered to Goddess Lakshmi.",
        summary: "Diwali is celebrated on the Amavasya (New Moon) Tithi of the Kartik month. The main Lakshmi Puja is performed during the Pradosh Kaal (the period after sunset).",
        rituals: "1. Homes are cleaned and decorated with diyas, candles, and rangoli.\n2. In the evening, families gather for Lakshmi Puja to seek blessings of wealth and prosperity.\n3. Feasts are prepared, and sweets are exchanged with family and friends. Fireworks are also a common part of the celebration.",
        calculationMethod: "1. Diwali falls on the Amavasya (New Moon) of the Hindu lunar month of Kartik.\n2. The most auspicious time for Lakshmi Puja is determined by the Pradosh Kaal, when the Amavasya Tithi is prevailing.\n3. A stable Lagna (Sthir Lagna), typically Vrishabha (Taurus), is preferred during the puja muhurat to ensure that Lakshmi's blessings remain in the home."
    },
    { 
        name: 'Deepavali', 
        date: '2024-11-01',
        mainDescription: "Diwali, the festival of lights, is one of the most significant Hindu festivals. It symbolizes the victory of light over darkness and good over evil. Homes are decorated with lamps (diyas) and prayers are offered to Goddess Lakshmi.",
        summary: "Diwali is celebrated on the Amavasya (New Moon) Tithi of the Kartik month. The main Lakshmi Puja is performed during the Pradosh Kaal (the period after sunset).",
        rituals: "1. Homes are cleaned and decorated with diyas, candles, and rangoli.\n2. In the evening, families gather for Lakshmi Puja to seek blessings of wealth and prosperity.\n3. Feasts are prepared, and sweets are exchanged with family and friends. Fireworks are also a common part of the celebration.",
        calculationMethod: "1. Diwali falls on the Amavasya (New Moon) of the Hindu lunar month of Kartik.\n2. The most auspicious time for Lakshmi Puja is determined by the Pradosh Kaal, when the Amavasya Tithi is prevailing.\n3. A stable Lagna (Sthir Lagna), typically Vrishabha (Taurus), is preferred during the puja muhurat to ensure that Lakshmi's blessings remain in the home."
    },

    // 2025
    { 
        name: 'Makar Sankranti', 
        date: '2025-01-14',
        mainDescription: "Makar Sankranti marks the transition of the Sun into the zodiac sign of Makara (Capricorn). It is a harvest festival celebrated with kite flying, bonfires, and feasting.",
        summary: "This festival is one of the few Hindu festivals based on the solar calendar. The main celebrations occur on the day the Sun enters Capricorn, marking the end of winter and the beginning of longer days.",
        rituals: "1. Taking a holy dip in rivers like the Ganga is considered auspicious.\n2. Flying kites is a popular tradition, especially in Gujarat.\n3. Special sweets made of sesame seeds (til) and jaggery (gud) are prepared and shared.",
        calculationMethod: "1. Makar Sankranti is determined by the solar calendar, not the lunar one.\n2. It occurs when the Sun god, Surya, enters the Makara (Capricorn) rashi.\n3. The exact time of the Sun's transit is known as the Sankranti moment. Punyakala (auspicious time for rituals) and Mahapunyakala are calculated from this moment."
    },
    { 
        name: 'Maha Shivratri', 
        date: '2025-02-26',
        mainDescription: "Maha Shivratri, 'the Great Night of Shiva', is a solemn festival dedicated to the worship of Lord Shiva. Devotees observe a day-long fast and an all-night vigil (jagran).",
        summary: "It is celebrated on the Chaturdashi (14th day) of the Krishna Paksha in the month of Phalguna. The Nishita Kaal puja, performed late at night, is the most significant ritual.",
        rituals: "1. Devotees fast and offer prayers, milk, water, and bel leaves to the Shiva Lingam.\n2. Many stay awake all night, chanting mantras and singing bhajans in praise of Lord Shiva.\n3. It is a day of introspection and meditation.",
        calculationMethod: "1. The festival is observed on the Chaturdashi Tithi of the Krishna Paksha in the lunar month of Phalguna.\n2. The most important puja time is the Nishita Kaal, the midnight period.\n3. The day is divided into four prahars, and pujas are often performed in each of these four periods throughout the night."
    },
    { 
        name: 'Holi', 
        date: '2025-03-14',
        mainDescription: "Holi, the festival of colors, celebrates the arrival of spring and the victory of good over evil. People play with colors, water, and enjoy festive food.",
        summary: "Holi is a two-day festival. The first day, Holika Dahan, is celebrated on the Purnima (Full Moon) night of the Phalguna month. The second day, Rangwali Holi, is the main day of color play.",
        rituals: "1. On the evening of Holika Dahan, a bonfire is lit to symbolize the burning of the demoness Holika.\n2. The next day, people smear each other with dry and wet colors.\n3. Special delicacies like 'gujiya' are prepared and shared.",
        calculationMethod: "1. Holika Dahan is performed on the Purnima Tithi of the Phalguna month, after sunset, during the Pradosh Kaal.\n2. It is crucial that the Bhadra period is over before the Dahan is performed.\n3. The main color festival (Rangwali Holi) is celebrated the day after Holika Dahan."
    },
    { 
        name: 'Ram Navami', 
        date: '2025-04-06',
        mainDescription: "Ram Navami celebrates the birth of Lord Rama, the seventh incarnation of Lord Vishnu. It is observed with prayers, readings of the Ramayana, and charity.",
        summary: "The festival falls on the Navami Tithi (9th day) of the Shukla Paksha in the month of Chaitra. The main puja is performed during the Madhyahna (midday) period.",
        rituals: "1. Devotees observe fasts and visit temples dedicated to Lord Rama.\n2. Continuous reading of the epic Ramayana is organized in many places.\n3. Kanya Pujan (worshipping young girls) is also a common ritual in some regions.",
        calculationMethod: "1. Ram Navami is celebrated on the Navami Tithi of the Shukla Paksha in the month of Chaitra.\n2. The most auspicious time for the birth celebration is the Madhyahna (midday) period, as Lord Rama is believed to have been born at this time."
    },
    { 
        name: 'Raksha Bandhan', 
        date: '2025-08-09',
        mainDescription: "Raksha Bandhan is a festival that celebrates the bond of love between brothers and sisters. Sisters tie a sacred thread called a 'rakhi' on their brothers' wrists, symbolizing their love and prayers for their well-being.",
        summary: "The key ritual involves the sister tying the rakhi. The Purnima Tithi is the most important factor, and the ceremony should ideally be performed during the Aparahna time of day.",
        rituals: "1. The sister prepares a thali with a rakhi, diya, sweets, and roli-chawal.\n2. She applies a tilak on her brother's forehead, performs aarti, and ties the rakhi.\n3. The brother gives a gift to the sister and vows to protect her.",
        calculationMethod: "1. Raksha Bandhan is celebrated on the Purnima (Full Moon) day of the Shravana month.\n2. The ideal time to tie the rakhi is during the Aparahna time, which is late afternoon according to the Hindu division of the day.\n3. Care is taken to avoid the Bhadra period, which is considered inauspicious for this ritual."
    },
    { 
        name: 'Krishna Janmashtami', 
        date: '2025-08-16',
        mainDescription: "Krishna Janmashtami celebrates the birth of Lord Krishna. Devotees observe fasts, sing devotional songs, and perform pujas at midnight, believed to be the time of Krishna's birth.",
        summary: "The festival is celebrated on the Ashtami (8th day) of the Krishna Paksha (dark fortnight) in the month of Bhadrapada. The celebration peaks at midnight with the birth ceremony of Lord Krishna.",
        rituals: "1. Devotees fast throughout the day.\n2. Temples and homes are decorated, and scenes from Krishna's life are depicted.\n3. At midnight, an idol of infant Krishna is bathed, clothed, and placed in a cradle. Aarti and bhajans are performed.",
        calculationMethod: "1. The festival date is determined by the Ashtami Tithi of the Krishna Paksha in the month of Bhadrapada.\n2. The puja is specifically performed at midnight (Nishita Kaal), as this is considered the exact time of Lord Krishna's birth.\n3. The Rohini Nakshatra is also highly significant; if it aligns with the Ashtami Tithi, the celebration is considered even more auspicious."
    },
    { 
        name: 'Janmashtami', 
        date: '2025-08-16',
        mainDescription: "Krishna Janmashtami celebrates the birth of Lord Krishna. Devotees observe fasts, sing devotional songs, and perform pujas at midnight, believed to be the time of Krishna's birth.",
        summary: "The festival is celebrated on the Ashtami (8th day) of the Krishna Paksha (dark fortnight) in the month of Bhadrapada. The celebration peaks at midnight with the birth ceremony of Lord Krishna.",
        rituals: "1. Devotees fast throughout the day.\n2. Temples and homes are decorated, and scenes from Krishna's life are depicted.\n3. At midnight, an idol of infant Krishna is bathed, clothed, and placed in a cradle. Aarti and bhajans are performed.",
        calculationMethod: "1. The festival date is determined by the Ashtami Tithi of the Krishna Paksha in the month of Bhadrapada.\n2. The puja is specifically performed at midnight (Nishita Kaal), as this is considered the exact time of Lord Krishna's birth.\n3. The Rohini Nakshatra is also highly significant; if it aligns with the Ashtami Tithi, the celebration is considered even more auspicious."
    },
    { 
        name: 'Navratri', 
        date: '2025-09-23',
        mainDescription: "Navratri, meaning 'nine nights', is a festival dedicated to the worship of the nine forms of Goddess Durga. It is a period of fasting, prayer, dance (Garba), and celebration.",
        summary: "Sharad Navratri begins on the Pratipada Tithi of the Shukla Paksha in the month of Ashwina. It spans nine nights, with each day dedicated to a different form of the Goddess.",
        rituals: "1. A Kalash Sthapana is performed on the first day.\n2. Devotees often observe fasts, consuming only specific foods.\n3. Each evening involves aarti and prayers. In many parts of India, community dances like Garba and Dandiya Raas are held.",
        calculationMethod: "1. Navratri begins on the Pratipada Tithi (first day) of the Shukla Paksha of the lunar month of Ashwina.\n2. The festival continues for nine consecutive days, following the lunar calendar.\n3. The culmination is on the tenth day, celebrated as Dussehra or Vijayadashami."
    },
    { 
        name: 'Dussehra', 
        date: '2025-10-02',
        mainDescription: "Dussehra, also known as Vijayadashami, marks the victory of Lord Rama over the demon king Ravana, symbolizing the triumph of good over evil. It also celebrates Goddess Durga's victory over Mahishasura.",
        summary: "Celebrated on the Dashami Tithi (10th day) of the Shukla Paksha in the month of Ashwina, it concludes the nine days of Navratri.",
        rituals: "1. Effigies of Ravana, his brother Kumbhakarna, and his son Meghanada are burnt in large public grounds.\n2. In many parts of India, it is a day for worshipping weapons and tools (Shastra Puja).\n3. Processions carrying idols of Goddess Durga for immersion are common.",
        calculationMethod: "1. Dussehra is celebrated on the Dashami Tithi of the Shukla Paksha in the month of Ashwina.\n2. The Vijay Muhurat (an auspicious time during the afternoon) is considered the most potent time to begin new ventures.\n3. The Aparahna time is when most of the key rituals, including the burning of effigies, are performed."
    },
    { 
        name: 'Vijayadashami', 
        date: '2025-10-02',
        mainDescription: "Dussehra, also known as Vijayadashami, marks the victory of Lord Rama over the demon king Ravana, symbolizing the triumph of good over evil. It also celebrates Goddess Durga's victory over Mahishasura.",
        summary: "Celebrated on the Dashami Tithi (10th day) of the Shukla Paksha in the month of Ashwina, it concludes the nine days of Navratri.",
        rituals: "1. Effigies of Ravana, his brother Kumbhakarna, and his son Meghanada are burnt in large public grounds.\n2. In many parts of India, it is a day for worshipping weapons and tools (Shastra Puja).\n3. Processions carrying idols of Goddess Durga for immersion are common.",
        calculationMethod: "1. Dussehra is celebrated on the Dashami Tithi of the Shukla Paksha in the month of Ashwina.\n2. The Vijay Muhurat (an auspicious time during the afternoon) is considered the most potent time to begin new ventures.\n3. The Aparahna time is when most of the key rituals, including the burning of effigies, are performed."
    },
    { 
        name: 'Diwali', 
        date: '2025-10-21',
        mainDescription: "Diwali, the festival of lights, is one of the most significant Hindu festivals. It symbolizes the victory of light over darkness and good over evil. Homes are decorated with lamps (diyas) and prayers are offered to Goddess Lakshmi.",
        summary: "Diwali is celebrated on the Amavasya (New Moon) Tithi of the Kartik month. The main Lakshmi Puja is performed during the Pradosh Kaal (the period after sunset).",
        rituals: "1. Homes are cleaned and decorated with diyas, candles, and rangoli.\n2. In the evening, families gather for Lakshmi Puja to seek blessings of wealth and prosperity.\n3. Feasts are prepared, and sweets are exchanged with family and friends. Fireworks are also a common part of the celebration.",
        calculationMethod: "1. Diwali falls on the Amavasya (New Moon) of the Hindu lunar month of Kartik.\n2. The most auspicious time for Lakshmi Puja is determined by the Pradosh Kaal, when the Amavasya Tithi is prevailing.\n3. A stable Lagna (Sthir Lagna), typically Vrishabha (Taurus), is preferred during the puja muhurat to ensure that Lakshmi's blessings remain in the home."
    },
    { 
        name: 'Deepavali', 
        date: '2025-10-21',
        mainDescription: "Diwali, the festival of lights, is one of the most significant Hindu festivals. It symbolizes the victory of light over darkness and good over evil. Homes are decorated with lamps (diyas) and prayers are offered to Goddess Lakshmi.",
        summary: "Diwali is celebrated on the Amavasya (New Moon) Tithi of the Kartik month. The main Lakshmi Puja is performed during the Pradosh Kaal (the period after sunset).",
        rituals: "1. Homes are cleaned and decorated with diyas, candles, and rangoli.\n2. In the evening, families gather for Lakshmi Puja to seek blessings of wealth and prosperity.\n3. Feasts are prepared, and sweets are exchanged with family and friends. Fireworks are also a common part of the celebration.",
        calculationMethod: "1. Diwali falls on the Amavasya (New Moon) of the Hindu lunar month of Kartik.\n2. The most auspicious time for Lakshmi Puja is determined by the Pradosh Kaal, when the Amavasya Tithi is prevailing.\n3. A stable Lagna (Sthir Lagna), typically Vrishabha (Taurus), is preferred during the puja muhurat to ensure that Lakshmi's blessings remain in the home."
    },
];
