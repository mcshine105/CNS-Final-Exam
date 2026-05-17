const QUESTIONS = [
  {
    "question": "Which Windows utility is used to troubleshoot network latency by showing the response time of each hop to a destination?",
    "options": ["A. ipconfig", "B. ping", "C. nslookup", "D. tracert"],
    "answer": "D"
  },
  {
    "question": "What does the acronym EIGRP stand for?",
    "options": ["A. Enhanced Interior Gateway Routing Protocol", "B. Extended Internal Group Routing Process", "C. Ethernet Interior Gateway Routing Path", "D. External Integrated Gateway Routing Protocol"],
    "answer": "A"
  },
  {
    "question": "A network uses NAT to allow multiple private hosts to access the internet. What is the primary functional benefit of this?",
    "options": ["A. It encrypts all traffic for security", "B. It conserves public IPv4 addresses by mapping private addresses to a public one", "C. It increases the physical throughput of the fiber connection", "D. It dynamically assigns hostnames to IP addresses"],
    "answer": "B"
  },
  {
    "question": "What does the acronym OSPF stand for?",
    "options": ["A. Open System Path Finding", "B. Optimized Shortest Path First", "C. Open Shortest Path First", "D. Open Short Path First"],
    "answer": "C"
  },
  {
    "question": "Which command is used on a Windows host to verify its currently assigned IP address and default gateway?",
    "options": ["A. ipconfig", "B. ifconfig", "C. route print", "D. show ip int brief"],
    "answer": "A"
  },
  {
    "question": "A router primarily performs its path determination and packet switching at which layer of the OSI model?",
    "options": ["A. Layer 2 (Data Link)", "B. Layer 3 (Network)", "C. Layer 4 (Transport)", "D. Layer 1 (Physical)"],
    "answer": "B"
  },
  {
    "question": "Which protocol uses the DUAL algorithm to calculate the best loop-free path and feasible successors?",
    "options": ["A. OSPF", "B. RIP", "C. BGP", "D. EIGRP"],
    "answer": "D"
  },
  {
    "question": "What does the acronym MAC stand for in a networking context?",
    "options": ["A. Media Access Control", "B. Media Authentication Code", "C. Media Address Center", "D. Media Access Connection"],
    "answer": "A"
  },
  {
    "question": "In digital communication, what is the smallest unit of data, represented as a single 1 or 0?",
    "options": ["A. Byte", "B. Packet", "C. bit", "D. Frame"],
    "answer": "C"
  },
  {
    "question": "Which Cisco IOS command is required to move from privileged EXEC mode to the mode where you can change system-wide settings?",
    "options": ["A. configuration terminal", "B. interface fastethernet 0/0", "C. show running-config", "D. enable"],
    "answer": "A"
  },
  {
    "question": "What does the acronym UDP stand for?",
    "options": ["A. User Datagram Protocol", "B. Unified Data Process", "C. Universal Delivery Protocol", "D. User Data Packet"],
    "answer": "A"
  },
  {
    "question": "Which term describes a protocol like RIP that learns about network changes only via its directly connected neighbors?",
    "options": ["A. Link State", "B. Distance Vector", "C. Path Vector", "D. Static"],
    "answer": "B"
  },
  {
    "question": "After configuring a router interface, which command must be issued to change its status from 'Administratively Down' to 'Up'?",
    "options": ["A. no shutdown", "B. enable interface", "C. startup", "D. interface active"],
    "answer": "A"
  },
  {
    "question": "What does the acronym IS-IS stand for?",
    "options": ["A. Integrated System to Integrated System", "B. Internal Standard to Internal Standard", "C. Intermediate System to Intermediate System", "D. Inter-Switch to Inter-Switch"],
    "answer": "C"
  },
  {
    "question": "Using VLSM, what is the smallest subnet mask that can support a point-to-point link while minimizing wasted host addresses?",
    "options": ["A. /24", "B. /30", "C. /32", "D. /29"],
    "answer": "B"
  },
  {
    "question": "What does the acronym BGP stand for?",
    "options": ["A. Basic Gateway Protocol", "B. Border Gateway Protocol", "C. Binary Gateway Process", "D. Broadband Gateway Protocol"],
    "answer": "B"
  },
  {
    "question": "How is an Autonomous System (AS) defined in the context of internet routing?",
    "options": ["A. A collection of networks under a single administrative domain", "B. A router that functions without manual configuration", "C. A server that handles automated DHCP requests", "D. A network topology that uses a self-healing ring"],
    "answer": "A"
  },
  {
    "question": "What does the acronym DHCP stand for?",
    "options": ["A. Dynamic Host Control Protocol", "B. Dynamic Host Configuration Protocol", "C. Domain Host Control Process", "D. Dynamic Host Communication Protocol"],
    "answer": "B"
  },
  {
    "question": "Which communication type involves a single source sending data to exactly one destination host?",
    "options": ["A. One-to-Many", "B. One-to-All", "C. One-to-One", "D. Many-to-Many"],
    "answer": "C"
  },
  {
    "question": "What is the correct first octet range for an IPv4 Class B address?",
    "options": ["A. 127-191", "B. 128-191", "C. 192-223", "D. 128-190"],
    "answer": "B"
  },
  {
    "question": "What does NAT stand for?",
    "options": ["A. Network Address Translation", "B. Network Access Topology", "C. Native Address Transfer", "D. Node Access Table"],
    "answer": "A"
  },
  {
    "question": "Which protocol provides timestamping and sequencing for real-time traffic such as VoIP?",
    "options": ["A. FTP", "B. SNMP", "C. RTP", "D. HTTP"],
    "answer": "C"
  },
  {
    "question": "What is the primary purpose of an OSPF Virtual Link?",
    "options": ["A. To double the available bandwidth of an interface", "B. To connect a non-backbone area to Area 0 through a transit area", "C. To encrypt traffic moving between different areas", "D. To act as a software-defined replacement for physical cabling"],
    "answer": "B"
  },
  {
    "question": "What is the primary difference between UTP and STP cabling?",
    "options": ["A. The number of wire pairs", "B. The maximum cable length", "C. The presence of internal metallic shielding", "D. The type of RJ-45 connector used"],
    "answer": "C"
  },
  {
    "question": "Which family of networking technologies is standard for most modern Local Area Networks (LANs)?",
    "options": ["A. LANs", "B. WANs", "C. SANs", "D. VPNs"],
    "answer": "A"
  },
  {
    "question": "Which open organization is responsible for the technical development of the Internet via RFCs?",
    "options": ["A. IEEE", "B. IETF", "C. ICANN", "D. ISO"],
    "answer": "B"
  },
  {
    "question": "Which transmission method is used when a server sends data to a specific subset of interested hosts?",
    "options": ["A. One-to-One", "B. One-to-All", "C. One-to-Many", "D. All-to-One"],
    "answer": "C"
  },
  {
    "question": "Which address is used to verify that the local TCP/IP stack is functioning correctly?",
    "options": ["A. Broadcast", "B. Multicast", "C. Loopback address", "D. Private IP"],
    "answer": "C"
  },
  {
    "question": "A Layer 2 switch makes its forwarding decisions primarily based on which piece of information?",
    "options": ["A. IP Addresses", "B. MAC Addresses", "C. Port Numbers", "D. TTL values"],
    "answer": "B"
  },
  {
    "question": "In CIDR notation, which prefix is exactly equivalent to the subnet mask 255.255.255.128?",
    "options": ["A. /24", "B. /25", "C. /26", "D. /27"],
    "answer": "B"
  },
  {
    "question": "What is a defining characteristic of Static Routing?",
    "options": ["A. Routes are updated automatically when a link fails", "B. Routes are manually entered into the routing table by an administrator", "C. It is only used for configuring wireless access points", "D. It is a core feature of the RIP protocol"],
    "answer": "B"
  },
  {
    "question": "What is the primary function of a router's Console port?",
    "options": ["A. Connecting to a network printer", "B. Providing high-speed fiber data transfer", "C. Out-of-band management and initial hardware configuration", "D. Connecting a standard DSL phone line"],
    "answer": "C"
  },
  {
    "question": "In an IP subnet, what is the specific role of the Network Address?",
    "options": ["A. It is the address assigned to the last usable host", "B. It identifies the entire logical network or subnet segment", "C. It is the address used to send data to all hosts simultaneously", "D. It is the default address of the local gateway router"],
    "answer": "B"
  },
  {
    "question": "Which of the following IP blocks is reserved for Class B private network use?",
    "options": ["A. 10.0.0.0/8", "B. 192.168.0.0/16", "C. 172.16.0.0 - 172.31.255.255", "D. 169.254.0.0/16"],
    "answer": "C"
  },
  {
    "question": "What is the fundamental purpose of 'Routing' in a computer network?",
    "options": ["A. Connecting a wireless mouse to a desktop computer", "B. Determining the best path to move packets across different networks", "C. Generating and printing network documentation", "D. Managing the internal power supply of a rack-mounted switch"],
    "answer": "B"
  },
  {
    "question": "Which OSI layer is responsible for the logical addressing of 'Packets'?",
    "options": ["A. Layer 2", "B. Layer 3", "C. Layer 4", "D. Layer 7"],
    "answer": "B"
  },
  {
    "question": "In OSPF terminology, what is a 'Transient Link'?",
    "options": ["A. A physical cable that is currently disconnected", "B. A network segment with multiple routers attached (e.g., Ethernet)", "C. A serial connection between exactly two routers", "D. A virtual tunnel used for secure encrypted traffic"],
    "answer": "B"
  },
  {
    "question": "What does the acronym FLSM represent in the context of subnetting?",
    "options": ["A. Fixed Length Subnet Mask", "B. Fast Local Subnet Mode", "C. Flexible Link State Management", "D. First Layer System Mapping"],
    "answer": "A"
  },
  {
    "question": "What is the total bit length of a standard IPv4 address?",
    "options": ["A. 128", "B. 64", "C. 48", "D. 32"],
    "answer": "D"
  },
  {
    "question": "What is the definition of an IGP?",
    "options": ["A. A routing protocol used within a single Autonomous System", "B. A global internet protocol for large-scale providers", "C. A process for integrating different gateway hardwares", "D. A protocol that encrypts all internal network traffic"],
    "answer": "A"
  },
  {
    "question": "How does the RIP protocol determine the 'best' path to a destination?",
    "options": ["A. By measuring the highest bandwidth", "B. By counting the number of router hops to the destination", "C. By calculating the lowest financial cost of the link", "D. By analyzing the reliability of the physical cable"],
    "answer": "B"
  },
  {
    "question": "What is the primary action of a packet sent to a Broadcast Address?",
    "options": ["A. It is delivered to a single specific host", "B. It is delivered to every host on the local network segment", "C. It is used solely to test the local network interface card", "D. It is used to connect two routers in different geographic cities"],
    "answer": "B"
  },
  {
    "question": "What is the primary role of an EGP?",
    "options": ["A. Managing traffic within a small home office network", "B. Exchanging routing information between different Autonomous Systems", "C. Assigning dynamic IP addresses to internal network hosts", "D. Switching Layer 2 frames within a data center"],
    "answer": "B"
  },
  {
    "question": "What is the primary organizational benefit of using 'Subnetting'?",
    "options": ["A. It physically increases the speed of the internet connection", "B. It divides a large network into smaller, more efficient logical segments", "C. It increases the physical length capacity of an Ethernet cable", "D. It allows Wi-Fi devices to connect without a password"],
    "answer": "B"
  },
  {
    "question": "In OSPF, what must be true for two routers on the same segment to become 'Neighbors'?",
    "options": ["A. They must have the exact same Router ID", "B. They must agree on the Hello and Dead intervals", "C. They must share the same physical MAC address", "D. They must share common area ID and subnet info"],
    "answer": "D"
  },
  {
    "question": "What characterizes a 'Point to Point' link in a network?",
    "options": ["A. A single router connected to a switch with many hosts", "B. A direct communication link between exactly two nodes", "C. A wireless access point serving multiple client devices", "D. A specific Layer 2 connection type"],
    "answer": "B"
  },
  {
    "question": "In computing, 'x86' refers to which category?",
    "options": ["A. The maximum speed of a Category 6 network cable", "B. A common family of CPU architectures", "C. A specific port number used for secure web browsing", "D. A processor instruction set standard"],
    "answer": "B"
  },
  {
    "question": "What is the purpose of an SSID in a wireless network?",
    "options": ["A. It acts as the hardware MAC address of the router", "B. It is the human-readable name of the wireless network", "C. It is the encryption key used to protect the data", "D. The unique identifier for a WLAN"],
    "answer": "B"
  },
  {
    "question": "How does a Link State protocol (like OSPF) differ from Distance Vector protocols?",
    "options": ["A. It maintains a complete and synchronized map of the network topology", "B. It only knows the distance to the next hop", "C. It broadcasts its entire routing table every 30 seconds", "D. It uses hop count as the only metric for path selection"],
    "answer": "A"
  },
  {
    "question": "What is the primary security benefit of using a VPN?",
    "options": ["A. It provides a secure, encrypted tunnel over a public network", "B. It significantly increases the physical speed of the ISP connection", "C. It allows for the assignment of more IP addresses to a home network", "D. It provides automatic DNS resolution for all websites"],
    "answer": "A"
  }
]
;