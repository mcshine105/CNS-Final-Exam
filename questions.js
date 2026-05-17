const QUESTIONS = [
  {
    "question": "A network administrator splits the network block 192.168.10.0/24 into four equal subnets using Fixed Length Subnet Masking (FLSM). What is the subnet address of the third sequential subnet?",
    "options": ["A. 192.168.10.32", "B. 192.168.10.128", "C. 192.168.10.192", "D. 192.168.10.64"],
    "answer": "B"
  },
  {
    "question": "What fundamental piece of information is entirely missing from RIPv1 routing updates, preventing it from functioning in a Variable Length Subnet Masking (VLSM) environment?",
    "options": ["A. Autonomous System number", "B. Hop count metric", "C. Next-hop IP address", "D. Subnet mask"],
    "answer": "D"
  },
  {
    "question": "If a switchport is manually configured with switchport mode dynamic auto and the connected device on the other end is a standard workstation NIC, what operational port type does the switchport settle into?",
    "options": ["A. Access port", "B. Trunk port", "C. Routed port", "D. Err-disabled port"],
    "answer": "A"
  },
  {
    "question": "Which two configuration parameters must be identical on two EIGRP routers for them to form a valid neighbor adjacency?",
    "options": ["A. Process ID and Hello interval", "B. Autonomous System (AS) number and K-values", "C. Router ID and Hold timer", "D. Virtual MAC address and variance multiplier"],
    "answer": "B"
  },
  {
    "question": "During the initial DHCPv4 lease process, which message is sent as a broadcast by the client device to signal that it is accepting a specific server's IP address offer?",
    "options": ["A. DHCP Discovery", "B. DHCP Offer", "C. DHCP Acknowledgement", "D. DHCP Request"],
    "answer": "D"
  },
  {
    "question": "When an OSPF process is initialized on a router, how does it automatically determine its Router ID if no manual loopback or physical interfaces are explicitly designated for the ID?",
    "options": ["A. It chooses the highest active physical IP address.", "B. It chooses the lowest active physical IP address.", "C. It generates a random 32-bit hex number.", "D. It defaults to 0.0.0.0 and stays inactive."],
    "answer": "A"
  },
  {
    "question": "If a switch configured in VTP Client mode receives a VTP summary advertisement with a configuration revision number lower than its own current database revision number, what action does it take?",
    "options": ["A. It updates its database to match the packet immediately.", "B. It changes its own mode from Client to Transparent.", "C. It ignores the advertisement entirely.", "D. It transmits its own database to overwrite the server."],
    "answer": "C"
  },
  {
    "question": "How many usable host IP addresses are available in a subnet that utilizes a /28 mask?",
    "options": ["A. 16", "B. 14", "C. 30", "D. 6"],
    "answer": "B"
  },
  {
    "question": "By default, what does a Cisco switch do with an incoming Ethernet frame on a trunk port if the frame does not possess an 802.1Q VLAN tag?",
    "options": ["A. It processes the frame within the configured Native VLAN broadcast domain.", "B. It drops the frame immediately.", "C. It tags it with VLAN 100 and forwards it to all trunks.", "D. It forwards it exclusively out of port FastEthernet0/1."],
    "answer": "A"
  },
  {
    "question": "What is the explicit length of the RIP Route Invalid Timer, after which a route is flagged as unreachable if no fresh updates are received?",
    "options": ["A. 30 seconds", "B. 240 seconds", "C. 180 seconds", "D. 300 seconds"],
    "answer": "C"
  },
  {
    "question": "Which DHCP message type is sent by the server to the client to officially finalize the configuration handshake and provide lease boundaries?",
    "options": ["A. DHCP Acknowledgement (ACK)", "B. DHCP Offer", "C. DHCP Request", "D. DHCP Discovery"],
    "answer": "A"
  },
  {
    "question": "What is the fundamental goal of using Variable Length Subnet Masking (VLSM) instead of Fixed Length Subnet Masking (FLSM)?",
    "options": ["A. To speed up packet forwarding inside Layer 3 switches.", "B. To allow legacy classful routing protocols to carry subnet information.", "C. To allocate subnets of varying sizes based on host requirements, reducing address waste.", "D. To eliminate the need for default gateway configurations on host machines."],
    "answer": "C"
  },
  {
    "question": "What happens to a standard unicast Ethernet frame if it enters an access port assigned to VLAN 10, but its target destination MAC address is not currently found in the switch's MAC address table?",
    "options": ["A. The switch drops the frame.", "B. The switch floods the frame to all access ports assigned specifically to VLAN 10.", "C. The switch floods the frame to all ports on the switch regardless of their VLAN.", "D. The switch forwards the frame to the VTP server for path resolution."],
    "answer": "B"
  },
  {
    "question": "What mask notation represents a default static route (Gateway of Last Resort)?",
    "options": ["A. 0.0.0.0/0", "B. 255.255.255.255/32", "C. 10.0.0.0/8", "D. 192.168.1.1/24"],
    "answer": "A"
  },
  {
    "question": "For the network block 172.16.50.64/26, what is the exact broadcast address of this subnet?",
    "options": ["A. 172.16.50.63", "B. 172.16.50.128", "C. 172.16.50.255", "D. 172.16.50.127"],
    "answer": "D"
  },
  {
    "question": "Which command completely stops a switch interface from generating or responding to Dynamic Trunking Protocol (DTP) negotiations?",
    "options": ["A. switchport mode trunk", "B. switchport mode access", "C. no switchport trunk allowed", "D. switchport nonegotiate"],
    "answer": "D"
  },
  {
    "question": "What specific OSPF structural database contains the complete structural map of the entire area network topology?",
    "options": ["A. Link-State Database (LSDB)", "B. Neighbor Table", "C. Routing Table", "D. EIGRP Topology Table"],
    "answer": "A"
  },
  {
    "question": "Which VTP operational mode allows a switch to create or delete local VLANs without sending those updates to other switches or changing its own database based on received network advertisements?",
    "options": ["A. VTP Server", "B. VTP Client", "C. VTP Transparent", "D. VTP Disabled"],
    "answer": "C"
  },
  {
    "question": "Why must you subtract two addresses when calculating the total number of usable host configurations for a given subnet mask block?",
    "options": ["A. One address is for the default gateway, and one is for the DNS server.", "B. One address is for the loopback interface, and one is for the management plane.", "C. One address is for the Network ID, and one is for the Subnet Broadcast address.", "D. Two addresses must be reserved to handle automated DHCP exclusions."],
    "answer": "C"
  },
  {
    "question": "What is the primary difference between a trunk link and an access link?",
    "options": ["A. Access links support traffic from a single VLAN, while trunk links carry traffic for multiple VLANs using frame tags.", "B. Access links route packets, while trunk links switch frames.", "C. Access links use fiber cables, while trunk links are restricted to copper lines.", "D. Access links require a VTP Server status to pass data safely."],
    "answer": "A"
  },
  {
    "question": "What metric does the Routing Information Protocol (RIP) use to measure path efficiency?",
    "options": ["A. Bandwidth", "B. Hop Count", "C. Interface Delay", "D. Link Cost"],
    "answer": "B"
  },
  {
    "question": "Why do network engineers write ip dhcp excluded-address rules on a Cisco router when setting up a pool?",
    "options": ["A. To prevent rogue DHCP servers from joining the Layer 2 local broadcast domain.", "B. To turn off DHCP processing on unneeded physical interfaces.", "C. To define the universal DNS domain suffix string.", "D. To keep specific IP addresses (like static gateways and servers) from being assigned to dynamic clients."],
    "answer": "D"
  },
  {
    "question": "If you apply Fixed Length Subnet Masking (FLSM) to create 8 distinct subnets from a single Class C /24 network block, what is the new subnet mask prefix size?",
    "options": ["A. /26", "B. /25", "C. /27", "D. /28"],
    "answer": "C"
  },
  {
    "question": "Which of the following is a clear operational advantage of Static Routing over Dynamic Routing protocols?",
    "options": ["A. It instantly adapts to physical topology changes without human intervention.", "B. It handles massive, scaling enterprise networks with minimal configuration steps.", "C. It uses zero network bandwidth and places no background processing overhead on the router's CPU/RAM.", "D. It automatically builds neighbor relationships using multicast Hello messages."],
    "answer": "C"
  },
  {
    "question": "If a router interface is explicitly configured with the IP address 192.168.1.45/30, what is the valid network address of this small subnet block?",
    "options": ["A. 192.168.1.44", "B. 192.168.1.0", "C. 192.168.1.40", "D. 192.168.1.46"],
    "answer": "A"
  },
  {
    "question": "Which state confirms that two OSPF neighbors have fully synchronized their link-state databases (LSDB) over a standard network connection?",
    "options": ["A. Init State", "B. Full State", "C. 2-Way State", "D. ExStart State"],
    "answer": "B"
  },
  {
    "question": "A small laboratory room requires exactly 25 usable host IP assignments for students. What is the most efficient subnet mask prefix length that satisfies this requirement without wasting addresses?",
    "options": ["A. /26", "B. /27", "C. /28", "D. /29"],
    "answer": "B"
  },
  {
    "question": "What configuration command must be applied to an incoming router interface to forward local client DHCP broadcast requests to a centralized server located in a completely different subnet?",
    "options": ["A. ip dhcp pool", "B. ip routing", "C. switchport mode access", "D. ip helper-address"],
    "answer": "D"
  },
  {
    "question": "Why does RIP set its maximum hop count boundary strictly at 15 hops?",
    "options": ["A. To prevent packets from looping infinitely around a broken network path.", "B. To save space within low-end serial hardware interface buffers.", "C. To match the native frame sizing restrictions of Class C IP addresses.", "D. To ensure compatibility with standard 802.1Q trunk headers."],
    "answer": "A"
  },
  {
    "question": "What is the default administrative distance of a manually written static route entry?",
    "options": ["A. 0", "B. 90", "C. 1", "D. 110"],
    "answer": "C"
  },
  {
    "question": "An engineer works with the address range 192.168.5.0/24. Subnet A uses a /26 prefix and starts at 192.168.5.0. If Subnet B is placed immediately after Subnet A with no overlapping space, what is the network address of Subnet B?",
    "options": ["A. 192.168.5.32", "B. 192.168.5.128", "C. 192.168.5.64", "D. 192.168.5.192"],
    "answer": "C"
  },
  {
    "question": "In VTP operations, what type of packet message is distributed every 5 minutes by a VTP Server to inform surrounding switches of the current configuration revision number?",
    "options": ["A. Summary Advertisement", "B. Subset Advertisement", "C. Client Request", "D. Join Request"],
    "answer": "A"
  },
  {
    "question": "What does a routing protocol's \"Administrative Distance\" signify?",
    "options": ["A. The total hop count delay across a physical path.", "B. The trustworthiness and preference level of the routing source.", "C. The literal bandwidth capacity of an exit interface.", "D. The total number of subnets configured inside an area map."],
    "answer": "B"
  },
  {
    "question": "What core architectural classification does the Open Shortest Path First (OSPF) protocol belong to?",
    "options": ["A. Distance-Vector", "B. Path-Vector", "C. Link-State", "D. Static-Hybrid"],
    "answer": "C"
  },
  {
    "question": "If a network administrator applies the command ip route 0.0.0.0 0.0.0.0 10.10.10.1, what type of path is being established on the router?",
    "options": ["A. Host route", "B. Default static route", "C. Loopback route", "D. Floating EIGRP route"],
    "answer": "B"
  },
  {
    "question": "What is the explicit filename used by a Cisco Catalyst switch to store local VLAN definitions and VTP tracking details?",
    "options": ["A. running-config", "B. vlan.dat", "C. startup-config", "D. ios.bin"],
    "answer": "B"
  },
  {
    "question": "If a /24 network block is broken down into exactly two equal subnets using FLSM, what is the modified subnet mask applied to each block?",
    "options": ["A. 255.255.255.192", "B. 255.255.255.128", "C. 255.255.255.224", "D. 255.255.255.240"],
    "answer": "B"
  },
  {
    "question": "Which dynamic routing protocol distributes its entire routing table out of all active interfaces at fixed periodic intervals of 30 seconds by default?",
    "options": ["A. EIGRP", "B. OSPF", "C. BGP", "D. RIP"],
    "answer": "D"
  },
  {
    "question": "When inspecting a router's active routing table via the CLI command show ip route, what letter code designates a path learned via OSPF?",
    "options": ["A. S", "B. R", "C. O", "D. D"],
    "answer": "C"
  },
  {
    "question": "If a routing table contains three distinct matching path prefixes for a target packet destination address—/8, /16, and /24—which path will the router choose to forward the packet?",
    "options": ["A. The path with the lowest administrative distance.", "B. The path that features the longest prefix match (/24).", "C. The path with the lowest numerical metric.", "D. The path that was configured first chronologically."],
    "answer": "B"
  },
  {
    "question": "What foundational calculation engine does EIGRP rely on to guarantee loop-free topology paths without waiting for fixed periodic timers?",
    "options": ["A. Bellman-Ford Algorithm", "B. Dijkstra's Shortest Path First (SPF)", "C. Spanning Tree Protocol (STP)", "D. Diffusing Update Algorithm (DUAL)"],
    "answer": "D"
  },
  {
    "question": "What basic transaction step represents the complete order of messages exchanged during a standard successful DHCP lease acquisition sequence?",
    "options": ["A. Request, Discover, Offer, Acknowledgement (RDOA)", "B. Discover, Offer, Request, Acknowledgement (DORA)", "C. Acknowledgement, Request, Offer, Discover (AROD)", "D. Discover, Request, Acknowledgement, Offer (DRAO)"],
    "answer": "B"
  },
  {
    "question": "Which of the following address ranges represents the designated private IP block space allocated for Class C configurations?",
    "options": ["A. 192.168.0.0 – 192.168.255.255", "B. 172.16.0.0 – 172.31.255.255", "C. 10.0.0.0 – 10.255.255.255", "D. 169.254.0.0 – 169.254.255.255"],
    "answer": "A"
  },
  {
    "question": "What specific metric value is applied by the RIP routing protocol to flag that a network path has become down, broken, or completely unreachable?",
    "options": ["A. 0", "B. 15", "C. 255", "D. 16"],
    "answer": "D"
  },
  {
    "question": "What operational challenge describes a major drawback of relying solely on Static Routing for an expanding enterprise network?",
    "options": ["A. It requires high administrative upkeep and lacks automatic fault tolerance when links fail.", "B. It consumes high CPU and memory resources during structural recalculations.", "C. It generates heavy background multicast traffic across trunk links.", "D. It cannot support standard classless subnet masks or VLSM schemes."],
    "answer": "A"
  },
  {
    "question": "What does the configuration feature known as \"VTP Pruning\" accomplish across a switched campus infrastructure?",
    "options": ["A. It deletes empty or unassigned VLAN definitions from the vlan.dat storage file.", "B. It shifts client switches into transparent operational modes automatically when performance drops.", "C. It prevents unnecessary broadcast or flooded traffic from traveling across trunk links to switches that have no active ports assigned to that specific VLAN.", "D. It zeros out mismatching configuration revision numbers across trunk endpoints."],
    "answer": "C"
  },
  {
    "question": "If a subnet block is defined with the network address 192.168.1.128/27, how many usable host IP addresses can be assigned to devices inside this block?",
    "options": ["A. 32", "B. 16", "C. 14", "D. 30"],
    "answer": "D"
  },
  {
    "question": "Which EIGRP database structure contains all path destinations learned from directly adjacent neighbors, listing both Successor and Feasible Successor paths?",
    "options": ["A. Neighbor Table", "B. Topology Table", "C. Routing Table", "D. Link-State Database"],
    "answer": "B"
  },
  {
    "question": "Which parameter option must be set within a Cisco router's DHCP pool configuration to tell client devices where to find their recursive Domain Name System server?",
    "options": ["A. default-router", "B. dns-server", "C. domain-name", "D. netbios-name-server"],
    "answer": "B"
  },
  {
    "question": "If a switchport interface is configured with the command switchport trunk allowed vlan 10,20, what happens to incoming frames belonging to VLAN 30?",
    "options": ["A. They are stripped of their tags and forwarded inside the native VLAN.", "B. They are dropped and blocked from traversing that specific trunk link.", "C. They are temporarily tagged with VLAN 10 and forwarded.", "D. They force the remote switch to rewrite its structural VTP database."],
    "answer": "B"
  }
]
;