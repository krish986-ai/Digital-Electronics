import { TopicItem } from '../../types';

export const MINIMIZATION_TOPICS: TopicItem[] = [
  {
    id: 't_kmap',
    slug: 'karnaugh-maps',
    unitId: 'minimization',
    unitTitle: 'Boolean Minimization & K-Maps',
    unitNumber: 3,
    chapterNumber: 1,
    title: 'Karnaugh Maps (K-Maps) for 2, 3 & 4 Variables',
    shortDescription: 'Gray-code 2D map arrangement, power-of-2 cell grouping (pairs, quads, octets), wraparound adjacent cells, and minimal SOP/POS generation.',
    estimatedMinutes: 26,
    difficulty: 'Intermediate',
    tags: ['K-Map', 'Gray Code', 'SOP Minimization', 'Prime Implicant', 'Essential PI'],
    overview: 'Invented by Maurice Karnaugh in 1953 at Bell Labs, the Karnaugh Map (K-Map) is a visual, graphical method for simplifying Boolean expressions without relying on tedious algebraic factoring. By mapping minterms onto a multi-dimensional toroid grid organized using Gray code (where physically adjacent cells differ by exactly one binary bit), human engineers and software algorithms can visually identify maximal groups of 1, 2, 4, 8, or 16 adjacent cells to eliminate redundant variables.',
    learningObjectives: [
      'Construct and label K-Maps for 2, 3, and 4 variables using Gray code order.',
      'Form legal rectangular groups of size 2^k (1, 2, 4, 8, 16) maximizing group size.',
      'Identify wraparound adjacency across left-right and top-bottom boundary edges.',
      'Derive minimal Sum of Products (SOP) and Product of Sums (POS) expressions.',
    ],
    prerequisites: ['Minterms, Maxterms, and Boolean laws.'],
    beginnerExplanation: 'Think of a K-Map like a puzzle grid. In normal algebra, you have to stare at long equations trying to spot hidden common terms. In a K-Map, whenever two 1s are sitting right next to each other on the grid, they automatically share all their variables EXCEPT ONE! Because that one variable changes from 0 to 1, it cancels itself out completely. If 4 ones form a square or row (a "quad"), TWO variables cancel out! If 8 ones group together, THREE variables cancel out! The bigger the group you circle, the smaller and cheaper your circuit becomes.',
    deepTechnicalExplanation: 'The mathematical foundation of K-Map grouping is the identity x·y + x·y\' = x(y + y\') = x·1 = x. For cells to be adjacent, they must possess a Hamming distance of exactly 1. This requires ordering rows and columns according to a reflected binary Gray code: 00, 01, 11, 10 (notice 11 precedes 10 to ensure a single bit change from 01 to 11 and from 11 to 10).\n\nK-Map Topologies:\n- 2 variables: 2×2 grid (4 cells)\n- 3 variables: 2×4 grid (8 cells)\n- 4 variables: 4×4 grid (16 cells)\n\nBoundary Wraparound: The K-map grid wraps continuously in both directions like a donut (torus). The leftmost column is adjacent to the rightmost column, and the topmost row is adjacent to the bottommost row. The 4 outer corners {m0, m2, m8, m10} in a 4-variable map form a valid 4-cell quad.',
    technicalDefinition: 'A planar depiction of a Boolean hypercube where vertices differing by Hamming distance 1 are mapped to geometrically adjacent spatial cells.',
    workingPrinciple: 'Every legal group must contain 2^k cells (1, 2, 4, 8, 16...). Grouping 2^k cells in an n-variable map eliminates k variables, producing a product term consisting of (n - k) literals.',
    diagrams: [
      {
        id: 'diag_kmap_oct',
        title: '4-Variable Karnaugh Map Adjacency Grid (Octet & Quad Minimization)',
        type: 'schematic',
        caption: '4x4 Gray code grid illustrating octet grouping (blue) and 4-corner wraparound quad grouping (green) to minimize logic functions.',
        svgType: 'KMAP_4VAR_OCTET',
      },
    ],
    lectureSections: [
      {
        id: 'sec_kmap_geometry',
        title: 'Module 1: The Hypercube Geometry of K-Maps & Gray Code Sequencing',
        subtitle: 'Mapping Multi-Dimensional Boolean Space onto a 2D Planar Grid',
        content: 'Algebraic Boolean simplification is prone to human error because human beings struggle to spot common terms in large equations. In 1953, Maurice Karnaugh (a telecommunications engineer at Bell Telephone Laboratories) revolutionized switching theory by inventing the Karnaugh Map (K-Map).\n\nFundamentally, an n-variable Boolean function represents vertices on an n-dimensional hypercube. The K-Map unfolds this hypercube into a 2D matrix where adjacent cells represent vertices differing by a Hamming distance of exactly 1 bit. To preserve this physical proximity on paper, rows and columns MUST be labeled in Reflected Binary Gray Code:\n00, 01, 11, 10 (Notice that 11 precedes 10!)\n\nWhy does 11 come before 10?\nIf we used natural binary (00, 01, 10, 11), moving from 01 to 10 changes TWO bits simultaneously (both bits flip), completely destroying spatial adjacency. By using Gray code, moving one step horizontally or vertically changes exactly ONE variable. When two adjacent cells both contain 1, they represent the identity: x · y + x · y\' = x(y + y\') = x · 1 = x. The changing variable is eliminated automatically by visual inspection!',
        formula: 'd_H(c_i, c_j) = 1 \\iff m_i + m_j = \\text{Term without differing literal}',
        keyPoints: [
          'A K-map for n variables contains exactly 2^n cells.',
          'Gray code sequence (00 -> 01 -> 11 -> 10) guarantees adjacent cells differ by only 1 bit.',
          'Physical adjacency represents the algebraic absorption law: A·B + A·B\' = A.',
        ],
        callout: {
          type: 'theorem',
          title: 'The Gray Code Adjacency Guarantee',
          text: 'Because Gray code ensures that the Hamming distance between any two physically neighboring cells is exactly 1, any two adjacent 1s on the grid factor out their differing variable with zero algebraic manipulation.',
        },
      },
      {
        id: 'sec_grouping_rules',
        title: 'Module 2: Rules of Grouping: Powers-of-Two, Boundary Wraparound & Toroid Adjacency',
        subtitle: 'The 5 Ironclad Laws of Karnaugh Map Grouping',
        content: 'To obtain a mathematically minimal Boolean equation, an engineer must follow 5 strict grouping laws:\n\n1. Legal Group Sizes: Groups MUST contain a power-of-two number of cells: 1, 2, 4, 8, or 16. Groups of 3, 5, 6, or 7 are strictly illegal and mathematically invalid.\n2. Shape: Groups must be contiguous rectangles or squares. Diagonal groupings are illegal because diagonal cells differ by 2 bits.\n3. Maximal Group Size: Always form the LARGEST possible groups! A larger group eliminates more variables:\n   • 2-cell group (Pair) eliminates 1 variable (leaves 3 literals in a 4-variable map).\n   • 4-cell group (Quad) eliminates 2 variables (leaves 2 literals).\n   • 8-cell group (Octet) eliminates 3 variables (leaves 1 literal).\n   • 16-cell group covers the entire map -> Function is a constant 1.\n4. Overlapping: Groups may overlap freely. If sharing a 1 allows another group to double in size (e.g. from a pair to a quad), always share the 1!\n5. Toroidal Boundary Wraparound: The K-map grid wraps around in both directions like a torus (donut):\n   • The leftmost column is adjacent to the rightmost column.\n   • The topmost row is adjacent to the bottommost row.\n   • The 4 outer corners {m0, m2, m8, m10} form a valid 4-cell quad yielding the minimal term B\'D\'!',
        formula: 'k \\text{ variables eliminated} = \\log_2(\\text{Group Size}), \\quad \\text{Literals remaining} = n - \\log_2(\\text{Group Size})',
        keyPoints: [
          'Never leave an isolated 1 if it can be combined with a neighbor.',
          'Check the 4 outer corners on every 4-variable K-map before creating separate pairs.',
          'Redundant groups: If all 1s in a group are already covered by other Essential Prime Implicants, do NOT include that group in the final equation!',
        ],
        callout: {
          type: 'tip',
          title: 'The "Four Corners" Reflex',
          text: 'Examiners frequently place 1s in the four corners {m0, m2, m8, m10} on university exams. Inexperienced students circle two separate horizontal pairs (B\'C\'D\' + AB\'D\'), wasting gates. Experienced engineers instantly spot the 4-corner quad to write B\'D\' directly!',
        },
      },
      {
        id: 'sec_sop_vs_pos',
        title: 'Module 3: Minimal Sum-of-Products (SOP) vs Product-of-Sums (POS) Realizations',
        subtitle: 'Grouping 1s vs Grouping 0s and Hardware Duality',
        content: 'K-Maps can generate both minimal Sum-of-Products (SOP) and Product-of-Sums (POS) equations:\n\n• Minimal SOP: Form maximal groups of 1s. Read the constant variables: 1 becomes uncomplemented (A), 0 becomes complemented (A\'). The resulting terms are ANDed and then ORed together.\n\n• Minimal POS: Form maximal groups of 0s to find F\', then invert using De Morgan’s Law! Alternatively, read the constant variables directly from the 0-groups: 0 becomes uncomplemented (A), 1 becomes complemented (A\'). The resulting terms are ORed and then ANDed together.\n\nHardware Trade-off:\nAlways compare whether grouping 1s or grouping 0s yields fewer gates! If a function has twelve 1s and only four 0s, grouping the 0s produces a POS expression requiring far fewer gates than the SOP expression.',
        formula: 'F_{SOP} = \\sum(\\text{Groups of 1s}), \\quad F_{POS} = \\left[ \\sum(\\text{Groups of 0s}) \\right]\' = \\prod(\\text{Dual Sum Terms})',
        keyPoints: [
          'Grouping 1s directly produces an AND-OR (SOP) schematic.',
          'Grouping 0s directly produces an OR-AND (POS) schematic.',
          'Choose whichever format has fewer required terms to minimize silicon area.',
        ],
        callout: {
          type: 'warning',
          title: 'The POS Inversion Pitfall',
          text: 'When writing POS terms directly from 0-groups, remember the polarity rule is inverted: A variable that is 0 across the group is written as (A), and a variable that is 1 is written as (A\'). Forgetting this produces the complement of the desired circuit!',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        '\\text{Hamming Distance } d_H(m_i, m_j) = 1 \\implies m_i + m_j = \\text{reduced term}',
        '\\text{Group of } 2^k \\text{ cells in } n \\text{ variables eliminates } k \\text{ variables}',
        '\\text{Literals in resulting product term} = n - k',
      ],
      derivationSteps: [
        'Grouping an entire 16-cell map (2^4 cells) eliminates 4 variables -> Constant F = 1.',
        'Grouping an 8-cell octet (2^3 cells) eliminates 3 variables -> Single literal term (e.g. D).',
        'Grouping a 4-cell quad (2^2 cells) eliminates 2 variables -> 2-literal term (e.g. B\'D\').',
        'Grouping a 2-cell pair (2^1 cells) eliminates 1 variable -> 3-literal term (e.g. A\'BC).',
      ],
    },
    solvedProblems: [
      {
        question: 'Minimize the 4-variable function: F(A, B, C, D) = Σm(0, 2, 5, 7, 8, 10, 13, 15).',
        solution: 'Step 1: Map the minterms into the 4x4 K-map.\n• Row 00 (AB=00): m0=1, m2=1\n• Row 01 (AB=01): m5=1, m7=1\n• Row 11 (AB=11): m13=1, m15=1\n• Row 10 (AB=10): m8=1, m10=1\n\nStep 2: Identify Maximal Groups:\n• Group 1 (Center 4-cells): m5, m7, m13, m15 form a 4-cell quad in columns CD = 01 and 11, across rows AB = 01 and 11. B=1 is constant, D=1 is constant -> Term = BD.\n• Group 2 (4 Corners): m0, m2, m8, m10 form a 4-corner wraparound quad! In row 00 and 10, B=0 is constant (B\'). In column 00 and 10, D=0 is constant (D\') -> Term = B\'D\'.\n\nStep 3: Combine Minimal Terms:\nF(A,B,C,D) = BD + B\'D\' = (B ⊕ D)\' (Equivalent to XNOR between B and D!).',
        explanation: 'The 4 corners of any 4-variable K-map are always adjacent on a torus geometry, eliminating A and C simultaneously.',
      },
    ],
    interactiveChecks: [
      {
        question: 'In a 4-variable Karnaugh map, which 4 minterms form the famous "Four Corners" wraparound quad?',
        options: [
          'm0, m3, m12, m15',
          'm0, m2, m8, m10',
          'm1, m3, m9, m11',
          'm4, m6, m12, m14',
        ],
        correctIndex: 1,
        hint: 'Top-left is m0 (0000), top-right is m2 (0010), bottom-left is m8 (1000), bottom-right is m10 (1010).',
        explanation: 'Because rows AB=00 and AB=10 are adjacent, and columns CD=00 and CD=10 are adjacent, the 4 corner cells m0, m2, m8, m10 form a valid power-of-2 quad yielding the minimal term B\'D\'.',
      },
      {
        question: 'How many variables are eliminated when grouping an octet (8 adjacent cells) in a 4-variable K-Map?',
        options: ['1 variable', '2 variables', '3 variables', '4 variables'],
        correctIndex: 2,
        hint: 'Formula is 2^k cells eliminates k variables. Here 8 = 2^3.',
        explanation: 'Grouping 8 = 2^3 cells eliminates exactly 3 variables, leaving a single literal in the resulting product term (4 - 3 = 1 literal).',
      },
    ],
    applications: [
      'Combinational logic design (encoders, decoders, multiplexers, arithmetic circuits).',
      'Minimizing state machine next-state logic in sequential controller design.',
    ],
    advantages: [
      'Visual, intuitive, and eliminates algebraic guesswork.',
      'Guarantees minimal SOP / POS representation for up to 4 variables.',
    ],
    limitations: [
      'Difficult to visualize for 5 or 6 variables (requires multiple 3D layered sub-maps) and unusable for 7+ variables (requires computer algorithms like Quine-McCluskey).',
    ],
    commonMistakes: [
      'Labeling row/column coordinates as 00, 01, 10, 11 (binary order) instead of 00, 01, 11, 10 (Gray code order). This ruins geometric adjacency!',
      'Making groups of 3 or 6 cells: groups MUST strictly be powers of 2 (1, 2, 4, 8, 16).',
    ],
    examPoints: [
      'Remember the 4 corner cells: {m0, m2, m8, m10} in a 4-variable map form a valid 4-cell quad yielding B\'D\'.',
      'Always circle Essential Prime Implicants first.',
    ],
    vivaQuestions: [
      {
        question: 'Why are coordinates on a Karnaugh map labeled in Gray code rather than natural binary?',
        answer: 'Because Gray code ensures that between any two physically adjacent cells, only one single binary variable changes state. This enables the Boolean reduction law x·y + x·y\' = x to be applied directly by visual grouping.',
      },
    ],
    relatedTopicSlugs: ['boolean-algebra-laws', 'dont-care-conditions'],
  },
  {
    id: 't_dont_care',
    slug: 'dont-care-conditions',
    unitId: 'minimization',
    unitTitle: 'Boolean Minimization & K-Maps',
    unitNumber: 3,
    chapterNumber: 2,
    title: 'Don’t-Care Conditions & Prime Implicants',
    shortDescription: 'Incompletely specified functions, leveraging ‘X’ terms for maximal grouping, and distinguishing Essential Prime Implicants.',
    estimatedMinutes: 22,
    difficulty: 'Intermediate',
    tags: ['Dont Care', 'Prime Implicant', 'Essential Prime Implicant', 'SOP'],
    overview: 'In many real-world digital applications, certain input combinations can never physically occur (for example, numbers 10 to 15 in a 4-bit BCD system), or the circuit output for those combinations has no effect on subsequent system behavior. These outputs are designated as Don’t-Care conditions (denoted as X or d). In K-maps, engineers can treat each X as either a 1 or a 0—whichever produces larger groups and a simpler circuit.',
    learningObjectives: [
      'Define incompletely specified Boolean functions and Don’t-Care terms.',
      'Use Don’t-Care cells strategically in K-Maps to enlarge groups without obligating them to be circled.',
      'Differentiate between Prime Implicants (PI) and Essential Prime Implicants (EPI).',
    ],
    prerequisites: ['Basic Karnaugh maps.'],
    beginnerExplanation: 'Imagine you are packing luggage and have some empty spaces where you don\'t care what goes in them. If putting a blanket in that space helps you pack a large square neatly, you fill it! But if you don\'t need to use that space, you just ignore it. In a K-Map, an "X" is an optional 1. If including an X helps you make a group of 4 instead of a group of 2, count the X as a 1! But you are NEVER forced to circle an X if it doesn\'t help you.',
    deepTechnicalExplanation: 'Definitions:\n1. Implicant: Any product term that subsumes the Boolean function.\n2. Prime Implicant (PI): A maximal group of 1s and Xs that cannot be merged into any larger power-of-2 group.\n3. Essential Prime Implicant (EPI): A Prime Implicant that contains at least one minterm (1) not covered by ANY other prime implicant.\n\nStrategy for Optimal Minimization:\n1. Identify all Essential Prime Implicants first; they MUST appear in the final minimal expression.\n2. If any 1s remain uncovered, select the minimum number of remaining prime implicants that cover them.\n3. Never form a group consisting solely of Xs.',
    technicalDefinition: 'An input valuation in the domain of a Boolean relation for which the output mapping is undefined or physically prohibited.',
    workingPrinciple: 'Assigning X = 1 enlarges group size, reducing literal count. Assigning X = 0 avoids creating redundant groups.',
    diagrams: [
      {
        id: 'diag_kmap_dc',
        title: "Don't-Care Optimization in BCD-to-7-Segment Decoder K-Map",
        type: 'schematic',
        caption: "Diagram illustrating how illegal BCD states (1010 to 1111) are assigned as X to enlarge groups into 8-cell octets.",
        svgType: 'DONT_CARE_BCD_MAP',
      },
    ],
    lectureSections: [
      {
        id: 'sec_incompletely_specified',
        title: 'Module 1: Incompletely Specified Functions & Forbidden States (BCD Hazards)',
        subtitle: 'The Engineering Origin of Don’t-Care (X / d) Conditions',
        content: 'In academic textbooks, Boolean functions are often introduced as "completely specified"—meaning for every single input combination (0000 through 1111), the required output is strictly specified as either 0 or 1.\n\nHowever, in real-world electronic systems, many functions are Incompletely Specified. There are two primary engineering causes:\n1. Physically Impossible Inputs: In Binary-Coded Decimal (BCD), 4 binary bits represent digits 0 through 9 (0000_2 to 1001_2). The remaining 6 binary words (1010 through 1111, decimal 10 to 15) are strictly illegal and physically never generated by a BCD counter. What should a BCD-to-7-segment decoder output if input 1100 arrives? We don\'t care!\n2. Output Irrelevance: In some states, an output wire is disconnected or ignored downstream by a multiplexer or tristate bus. Whether the wire sits at 0V or 5V has zero effect on the system.\n\nIn a Karnaugh Map, these input conditions are marked with an "X" or "d". An X can be assigned as 1 or 0 by the circuit designer to minimize silicon cost.',
        formula: 'F(x_1, \\dots, x_n) = \\sum m(\\text{minterms}) + d(\\text{don\'t cares})',
        keyPoints: [
          'Don’t-Cares are denoted as X or d in truth tables and K-maps.',
          'Assigning X = 1 enlarges groups, eliminating more literals.',
          'Assigning X = 0 prevents creating unnecessary, redundant gates.',
        ],
        callout: {
          type: 'theorem',
          title: 'The Don’t-Care Freedom Principle',
          text: 'Don’t-Care conditions provide extra degrees of freedom during optimization. An optimal synthesis algorithm chooses an assignment for each X ∈ {0, 1} such that the total literal count of the circuit is minimized.',
        },
      },
      {
        id: 'sec_pi_vs_epi',
        title: 'Module 2: Prime Implicants (PI) vs. Essential Prime Implicants (EPI)',
        subtitle: 'The Mathematical Classification of Group Coverings',
        content: 'To prove that a logic circuit is minimal, switching theory defines three precise classes of implicants:\n\n1. Implicant: Any single minterm or legal group of minterms where the function evaluates to 1.\n2. Prime Implicant (PI): A group of adjacent 1s and Xs that has been expanded to its absolute maximum power-of-two size. A group is a PI if and only if it cannot be merged into any larger legal group.\n3. Essential Prime Implicant (EPI): A Prime Implicant that contains at least one minterm (1) that is NOT covered by any other prime implicant! An EPI is non-negotiable: it MUST be included in every minimal SOP equation, otherwise that unique 1 would be left un-asserted.\n\nAlgorithmic Minimization Protocol:\nStep 1: Find all Prime Implicants by expanding every 1 to its maximal size (using Xs if helpful).\nStep 2: Circle all Essential Prime Implicants first.\nStep 3: Check if all 1s are covered. If all 1s are covered, STOP! Never circle leftover Xs.\nStep 4: If any 1s remain uncovered, choose the minimal set of non-essential PIs to cover them.',
        formula: '\\text{PI} \\text{ is maximal}; \\quad \\text{EPI} = \\{ PI_k \\mid \\exists m_j \\in PI_k, \\, m_j \\notin PI_i \\, \\forall i \\neq k \\}',
        keyPoints: [
          'An EPI has at least one "distinguished 1" that no other group can reach.',
          'Never circle a group made entirely of Xs (wastes hardware with zero benefit).',
          'A circuit may have multiple equally valid minimal SOP forms if non-essential PIs can be chosen interchangeably.',
        ],
        callout: {
          type: 'tip',
          title: 'How to Spot Essential Prime Implicants Instantly',
          text: 'Look for an isolated 1 that has only ONE possible partner or group. That group is instantly guaranteed to be an Essential Prime Implicant! Circle it immediately and check off all its covered 1s.',
        },
      },
      {
        id: 'sec_illegal_state_hazards',
        title: 'Module 3: Safety-Critical Hardware Hazards with Don’t-Care States',
        subtitle: 'Why Aerospace and Medical Hardware Hardens Don’t-Cares',
        content: 'While treating illegal states as Don’t-Cares drastically reduces gate count, it introduces a severe hardware safety hazard in mission-critical applications:\n\nIf electrical noise, an electrostatic discharge (ESD) event, or a cosmic ray single-event upset (SEU) flips a register bit into an illegal state (e.g. state 1101 in a BCD machine), what happens?\n• If the designer minimized the circuit by setting state 1101 to output HIGH, the system might trigger an emergency valve or fire an engine thruster!\n• Worse, in sequential finite state machines (FSMs), the machine can become trapped in an unhandled "deadlock loop" of illegal states from which it cannot escape without a hard system reset!\n\nFor aerospace (DO-254) and automotive (ISO 26262 ASIL-D) hardware, engineers use "Defensive Digital Design": illegal states are never left as Don’t-Cares; they are explicitly mapped to an illegal state trap that asserts a Hardware Fault Interrupt and resets the system into a safe fail-stop mode.',
        formula: '\\text{Safety Logic: } \\forall s \\in S_{illegal}, \\quad \\text{NextState}(s) = S_{reset}, \\quad \\text{FaultAlert} = 1',
        keyPoints: [
          'Cosmic rays and ground bounce can force digital circuits into illegal Don’t-Care states.',
          'Commercial ASICs optimize for area using Don’t-Cares; aerospace ASICs harden against them.',
          'Modern FSMs implement automatic lockup recovery logic for all unused states.',
        ],
        callout: {
          type: 'warning',
          title: 'The Lockup State Machine Danger',
          text: 'In a 3-bit Modulo-5 counter (using states 000 to 100), states 101, 110, and 111 are unused. If you treat them as Don’t-Cares, the synthesis tool might synthesize NextState(101) = 110 and NextState(110) = 101, creating an infinite lockup cycle that bricks the product!',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        'F(A, B, C, D) = \\sum m(...) + d(...)',
        '\\text{EPI} \\iff \\exists m_k \\in \\text{EPI} \\text{ such that } m_k \\notin \\text{any other PI}',
      ],
      derivationSteps: [
        'Identify all 1-cells that have only ONE possible group assignment. That group is an Essential Prime Implicant (EPI).',
        'Add all EPIs to the final minimal equation.',
        'Check if all 1s are covered. If not, pick the minimal set of remaining prime implicants.',
        'Ignore any leftover Xs: you are never required to cover a Don\'t-Care.',
      ],
    },
    solvedProblems: [
      {
        question: 'Minimize F(A, B, C, D) = Σm(1, 3, 7, 11, 15) with don\'t-cares d(0, 2, 5).',
        solution: 'Step 1: Place 1s at cells 1, 3, 7, 11, 15 and Xs at cells 0, 2, 5.\n\nStep 2: Form Groups:\n• Vertical column CD=11: Cells 3, 7, 11, 15 form an essential quad -> CD.\n• Row 01 (AB=01) & Row 00 (AB=00): Using d(5) with 1, 3, 7 forms an adjacent 4-cell quad {1, 3, 5, 7} -> A\'D.\n• Notice minterms {0(d), 1, 2(d), 3} in row 00 could form a quad A\'B\', but both 1 and 3 are ALREADY covered! Circling it would be redundant.\n\nStep 3: Minimal SOP:\nF = CD + A\'D.',
        explanation: 'd(0) and d(2) were treated as 0 because they were not needed, while d(5) was treated as 1 to enlarge the group for m1, m3, m7.',
      },
    ],
    interactiveChecks: [
      {
        question: 'What defines an Essential Prime Implicant (EPI)?',
        options: [
          'It is the largest group on the map.',
          'It contains at least one minterm (1) that is not covered by any other prime implicant.',
          'It contains only Don\'t-Care cells.',
          'It contains exactly 4 cells.',
        ],
        correctIndex: 1,
        hint: 'Essential means the circuit cannot function without it.',
        explanation: 'An Essential Prime Implicant is unique because it covers at least one "1" that no other group can cover. Therefore, it is mandatory in the minimal SOP equation.',
      },
    ],
    applications: [
      'BCD to 7-Segment display decoders (states 1010 to 1111 never occur in BCD, treated as don\'t-cares).',
      'Priority arbiter circuits and illegal state suppression in digital state machines.',
    ],
    advantages: [
      'Substantially reduces gate counts in industrial systems by exploiting forbidden input states.',
    ],
    limitations: [
      'If an unhandled noise glitch causes the circuit to enter a don\'t-care state, it might output unpredictable logic levels unless explicitly hardened.',
    ],
    commonMistakes: [
      'Circling a group that contains only Don’t-Care (X) cells. You NEVER need to cover Xs; Xs are only helpers to cover 1s.',
    ],
    examPoints: [
      'Essential Prime Implicant must contain at least one unique 1-cell.',
      'In BCD circuits, minterms 10 through 15 are always Don\'t-Cares.',
    ],
    vivaQuestions: [
      {
        question: 'What is the physical hazard of leaving don\'t-care states completely unconstrained in high-reliability aerospace hardware?',
        answer: 'Single-event radiation upsets (cosmic rays) can flip flip-flops into forbidden states (e.g. state 12 in a BCD counter). If don\'t-cares were optimized without recovery paths, the machine might lock up into an infinite illegal loop. High-reliability systems implement explicit "safe recovery" logic.',
      },
    ],
    relatedTopicSlugs: ['karnaugh-maps', 'adders-and-subtractors'],
  },
  {
    id: 't_quine_mccluskey',
    slug: 'quine-mccluskey-tabular-method',
    unitId: 'minimization',
    unitTitle: 'Boolean Minimization & K-Maps',
    unitNumber: 3,
    chapterNumber: 3,
    title: 'Quine-McCluskey (Tabular Method) & Prime Implicant Charts',
    shortDescription: 'Algorithmic computer minimization for 5+ variables, bit grouping by number of 1s, prime implicant chart reduction, and Petrick’s method.',
    estimatedMinutes: 25,
    difficulty: 'Advanced',
    tags: ['Quine-McCluskey', 'Tabular Method', 'Prime Implicant Table', 'Petricks Method', 'EDA Tools'],
    overview: 'While Karnaugh maps are intuitive for up to 4 variables, human spatial visualization breaks down for 5, 6, or more variables. The Quine-McCluskey method (also known as the Tabular Method) provides a deterministic, algorithmic procedure that is easily programmed into computer software (EDA synthesis tools like Synopsys Design Compiler, Yosys, and Quartus). It guarantees finding all prime implicants and the exact minimal sum of products for any number of input variables.',
    learningObjectives: [
      'Partition minterms into groups according to their index (number of 1s in binary representation).',
      'Execute systematic pairwise comparisons between adjacent index groups to merge terms with Hamming distance 1.',
      'Construct and solve Prime Implicant Tables using row dominance and column dominance rules.',
      'Apply Petrick’s Method to resolve cyclic Prime Implicant tables where no essential prime implicants exist.',
    ],
    prerequisites: ['Binary representations, Karnaugh maps, and Prime Implicant concepts.'],
    beginnerExplanation: 'Think of K-Maps like solving a jigsaw puzzle by eye. When the puzzle is small (4 pieces), your eyes find the match instantly! But what if the puzzle has 1,000 pieces? Your eyes would get exhausted. The Quine-McCluskey method is like writing a computer program: sort all pieces into buckets based on their weight (number of 1s), compare neighbors, replace differences with dashes, and build a master checklist. It is 100% mechanical, perfectly accurate, and never misses a simplification!',
    deepTechnicalExplanation: 'The Quine-McCluskey procedure executes in two distinct phases:\n\nPhase 1: Prime Implicant Generation\n1. Represent all minterms and don\'t-care conditions in binary format.\n2. Partition terms into groups based on their Hamming weight (count of 1-bits: Group 0, Group 1, Group 2, ...).\n3. Compare each term in Group i with all terms in Group (i+1). If two terms differ in exactly one bit position, merge them into a new term with a dash \'-\' in that position (e.g., 0100 and 0101 merge into 010-), and check off both parent terms.\n4. Repeat for pairs, quads, and octets until no further merges can occur. All unchecked terms are the Prime Implicants (PI).\n\nPhase 2: Prime Implicant Chart Optimization\n1. Construct a chart where rows represent Prime Implicants and columns represent minterms (excluding don\'t-cares).\n2. Mark an X in cell (i, j) if PI i covers minterm j.\n3. Essential Prime Implicant (EPI) Detection: If a column contains only ONE single X, the corresponding row is an EPI and MUST be included in the minimal cover.\n4. Row Dominance: If row A covers all minterms that row B covers, plus more, row A dominates row B (row B can be eliminated).\n5. Column Dominance: If column j covers all rows that column k covers, column j can be eliminated.\n6. Cyclic Tables: If no EPIs or dominance exists, formulate a Boolean product-of-sums of column covers (Petrick\'s Method) to find the minimum-cost cover.',
    technicalDefinition: 'An exact algorithmic technique based on recursive consensus and set covering for computing the minimum-cost representation of an incompletely specified Boolean function.',
    workingPrinciple: 'Systematic pairwise reduction exploiting the consensus identity a·b + a·b\' = a, followed by solving the NP-complete Set Cover problem using Branch-and-Bound or Petrick\'s algebraic method.',
    diagrams: [
      {
        id: 'diag_qm_table',
        title: 'Quine-McCluskey Prime Implicant Selection Chart & Algorithmic Flow',
        type: 'schematic',
        caption: 'Tabular minimization flow: Grouping by number of 1s, bit-difference dash merging, and Prime Implicant coverage table.',
        svgType: 'QUINE_MCCLUSKEY_FLOWCHART',
      },
    ],
    lectureSections: [
      {
        id: 'sec_curse_of_dimensionality',
        title: 'Module 1: The Curse of Dimensionality & Algorithmic Need for Tabular Reduction',
        subtitle: 'Why Computer EDA Tools Cannot Use Human Visual Maps',
        content: 'While Karnaugh maps are brilliant pedagogical tools for 2, 3, and 4 variables, they suffer from the "Curse of Dimensionality":\n• A 5-variable function requires two 4x4 maps placed side-by-side, requiring human 3D depth perception across layers.\n• A 6-variable function requires four 4x4 maps arranged in a 2x2 supergrid (16 corners!).\n• For 7, 8, or 64 variables (typical of CPU instruction decoders and crypto ALUs), human visualization fails completely.\n\nIn 1952, Willard V. Quine formulated a tabular procedure for minimizing logic statements, which was subsequently optimized into an efficient computer algorithm by Edward J. McCluskey in 1956. Known universally as the Quine-McCluskey (QM) or Tabular Method, this algorithm guarantees finding the absolute global minimum Boolean representation without any spatial intuition.',
        formula: 'N_{cells}(n) = 2^n, \\quad \\text{Human Limit } n \\le 5, \\quad \\text{Algorithmic Limit } n \\ge 16',
        keyPoints: [
          'Human spatial pattern recognition fails completely beyond 4 variables.',
          'Quine-McCluskey is 100% deterministic and programmable in code.',
          'Underpins automated logic synthesis in industrial EDA tools (Synopsys, Cadence, Quartus).',
        ],
        callout: {
          type: 'theorem',
          title: 'The Quine Consensus Theorem',
          text: 'Every minimal Sum-of-Products representation of a Boolean function is a subset of the set of its Prime Implicants. Therefore, logic minimization can be decomposed into two distinct phases: (1) Find all Prime Implicants, and (2) Solve the minimum set cover problem.',
        },
      },
      {
        id: 'sec_phase1_merging',
        title: 'Module 2: Phase 1: Minterm Grouping by 1-Count & Bitwise Consensus Merging',
        subtitle: 'Systematic Step-by-Step Pairwise Reduction via Dash Notation',
        content: 'Phase 1 systematically extracts all Prime Implicants through four mechanical steps:\n\nStep 1: Decimal to Binary Conversion\nConvert all minterms and don’t-care indices into n-bit binary words.\n\nStep 2: Partition by Index (Hamming Weight)\nGroup terms into buckets based strictly on the count of 1s in their binary representation:\n• Group 0 (no 1s): e.g. 0000 (m0)\n• Group 1 (single 1): e.g. 0001 (m1), 0010 (m2), 0100 (m4)\n• Group 2 (two 1s): e.g. 0011 (m3), 0101 (m5), 1100 (m12)\n• Group 3, Group 4, etc.\n\nStep 3: Pairwise Adjacent Bucket Comparisons\nCompare each term in Group k only with terms in Group (k+1). Why? Because two terms can differ by a single bit IF AND ONLY IF their 1-counts differ by exactly 1! If two terms differ in exactly one bit position, merge them into a new term with a dash \'-\' in that position (e.g. 0000 and 0001 merge into 000- covering m(0,1)), and check (✓) both parent terms.\n\nStep 4: Recursive Merging\nRepeat the process for 2-term groups to form 4-term groups (e.g. 000- and 001- merge into 00--). A merge can occur only if both terms have identical dash positions and differ by only one remaining binary bit. Repeat until no further merges are possible. All unchecked terms are the Prime Implicants (PI)!',
        formula: '0100 \\, (m_4) \\; \\& \\; 0101 \\, (m_5) \\implies 010- \\, (m_{4,5}) \\quad [A\'BC\']',
        keyPoints: [
          'Terms in non-adjacent groups (e.g. Group 1 and Group 3) CANNOT differ by 1 bit: never waste time comparing them!',
          'Dash \'-\' signifies that the corresponding variable is eliminated (absorbed).',
          'Every term that does not get checked off (✓) during merging is an official Prime Implicant.',
        ],
        callout: {
          type: 'tip',
          title: 'Dash Matching Rule for Larger Groups',
          text: 'When merging 2-cell terms to form 4-cell terms, only compare terms that have their dashes in the EXACT same position! For example, 0-01 can only merge with another term whose dash is in the second position (like 1-01).',
        },
      },
      {
        id: 'sec_phase2_pi_table',
        title: 'Module 3: Phase 2: The Prime Implicant Table, Dominance & Petrick’s Equation',
        subtitle: 'Solving the NP-Complete Minimal Set Covering Problem',
        content: 'Once all Prime Implicants are collected, Phase 2 finds the minimal subset that covers every minterm:\n\nStep 1: Construct the Coverage Table\n• Columns: All original minterms (EXCLUDING Don’t-Cares!).\n• Rows: All Prime Implicants found in Phase 1.\n• Place an X in cell (i, j) if PI i covers minterm j.\n\nStep 2: Identify Essential Prime Implicants (EPIs)\nScan the columns. If any column contains only ONE single X, that column is a "distinguished minterm." The corresponding row is an Essential Prime Implicant! Star (*) this row, include it in your final answer, and cross out all columns covered by this row.\n\nStep 3: Table Reduction via Dominance Rules\n• Row Dominance: If row A covers all minterms that row B covers, plus extra minterms, row A dominates row B. Cross out row B (it is redundant).\n• Column Dominance: If column j contains Xs in all rows where column k has Xs, column j dominates column k. Column j can be crossed out (covering column k automatically covers column j).\n\nStep 4: Petrick’s Method for Cyclic Tables\nIf no single-X columns or dominance rules remain, the table is "cyclic." Petrick’s Method writes a Boolean product-of-sums: each column generates a sum of the PIs that cover it (e.g. (P1 + P2)(P2 + P3)...). Expanding this expression into SOP using Boolean laws reveals the minimal sum of products with the fewest terms and literals!',
        formula: 'P = \\prod_{j=1}^{m} \\left( \\sum_{i \\in \\text{Row}(j)} P_i \\right) = \\text{Minimal Cost Product Terms}',
        keyPoints: [
          'Don’t-Cares appear in Phase 1 to enlarge PIs, but are strictly excluded from Phase 2 columns.',
          'Row dominance eliminates redundant PIs; column dominance eliminates redundant constraints.',
          'Petrick’s method transforms graph-theoretic set covering into purely algebraic Boolean multiplication.',
        ],
        callout: {
          type: 'warning',
          title: 'The NP-Hard Complexity Reality',
          text: 'The Set Covering problem in Phase 2 is NP-complete. For 30+ input variables, the Prime Implicant table can contain millions of rows, requiring supercomputer heuristics like the Espresso algorithm used in modern VLSI chip design.',
        },
      },
    ],
    mathematicalExplanation: {
      equations: [
        'd_H(A, B) = 1 \\implies A \\cup B \\to A[k \\to -]',
        'P = \\prod_{j} \\left( \\sum_{i \\in \\text{covers}(j)} PI_i \\right) \\quad (\\text{Petrick\'s Expression})',
      ],
      derivationSteps: [
        'Group 0: 0000 (m0)',
        'Group 1: 0001 (m1), 0010 (m2), 0100 (m4), 1000 (m8)',
        'Compare Group 0 with Group 1: 0000 & 0001 -> 000- (m0,1); 0000 & 0010 -> 00-0 (m0,2); 0000 & 0100 -> 0-00 (m0,4); 0000 & 1000 -> -000 (m0,8).',
        'Continue matching terms with identical dash positions to generate all Prime Implicants.',
      ],
    },
    solvedProblems: [
      {
        question: 'Using the Quine-McCluskey method, find all Prime Implicants for F(A,B,C,D) = Σm(0, 1, 2, 5, 6, 7).',
        solution: 'Step 1: Group by count of 1s:\n• Group 0: m0 (0000)\n• Group 1: m1 (0001), m2 (0010)\n• Group 2: m5 (0101), m6 (0110)\n• Group 3: m7 (0111)\n\nStep 2: Compare Adjacent Groups:\n• (0, 1) -> 000- (A\'B\'C\')\n• (0, 2) -> 00-0 (A\'B\'D\')\n• (1, 5) -> 0-01 (A\'C\'D)\n• (2, 6) -> 0-10 (A\'CD\')\n• (5, 7) -> 01-1 (A\'BD)\n• (6, 7) -> 011- (A\'BC)\n\nStep 3: Can any 2-cell terms merge into 4-cell terms?\nNone of the pairs share identical dash positions. Therefore, all 6 terms are Prime Implicants: {000-, 00-0, 0-01, 0-10, 01-1, 011-}.\n\nStep 4: Prime Implicant Table Analysis:\nMinimal cover selects {A\'B\'C\', A\'CD\', A\'BD} or {A\'B\'D\', A\'C\'D, A\'BC}. Both covers have 3 terms and 9 literals.',
        explanation: 'Notice how the Tabular method systematically identified all potential groupings without visual ambiguity.',
      },
    ],
    interactiveChecks: [
      {
        question: 'What is the primary engineering reason the Quine-McCluskey method is preferred over Karnaugh maps in Electronic Design Automation (EDA) software?',
        options: [
          'It is easier for human eyes to draw on paper.',
          'It is a fully deterministic algorithm with no spatial visualization limits, scaling to any number of variables on a computer.',
          'It uses fewer logic gates than Karnaugh maps.',
          'It only works for 3-variable circuits.',
        ],
        correctIndex: 1,
        hint: 'Computers cannot "look" at a 2D map the way human eyes do; they require iterative step-by-step algorithms.',
        explanation: 'Karnaugh maps rely on visual pattern recognition, which becomes impossible for human engineers beyond 5 or 6 variables. Quine-McCluskey uses mechanical string comparison and set covering, making it ideally suited for automated software synthesis tools.',
      },
    ],
    applications: [
      'Logic synthesis in Synopsys Design Compiler, Cadence Genus, and Intel Quartus EDA software.',
      'Automated hardware compilation from Verilog / VHDL RTL into gate-level netlists.',
    ],
    advantages: [
      'Completely algorithmic: guarantees finding all prime implicants with zero human error.',
      'Easily programmed in Python, C++, or Java for computer-aided engineering.',
    ],
    limitations: [
      'Computational complexity is NP-complete: worst-case runtime and memory explode exponentially for functions with more than 15-20 variables (leading to heuristic solvers like Espresso).',
    ],
    commonMistakes: [
      'Attempting to compare terms from non-adjacent index groups (e.g. Group 1 directly with Group 3). Terms can only differ by 1 bit if their 1-counts differ by exactly 1!',
      'Including Don\'t-Care terms as columns in the Prime Implicant Chart: Don\'t-Cares are used to generate PIs, but are NEVER listed as required columns to be covered!',
    ],
    examPoints: [
      'Tabular method consists of two phases: (1) Find all Prime Implicants, (2) Prime Implicant Chart to find minimal cover.',
      'Petrick\'s Method converts a cyclic PI chart into a Boolean equation to find the minimum-cost cover.',
    ],
    vivaQuestions: [
      {
        question: 'What is the Espresso heuristic logic minimizer, and why was it created to replace Quine-McCluskey?',
        answer: 'Quine-McCluskey is an exact algorithm whose computational time grows exponentially (NP-complete), becoming unusable for industrial microprocessors with 50+ inputs. The Espresso algorithm (developed at UC Berkeley) uses fast heuristic operations (EXPAND, REDUCE, IRREDUNDANT) to find near-optimal minimal logic in seconds, making it the industry standard engine in modern EDA tools.',
      },
    ],
    relatedTopicSlugs: ['karnaugh-maps', 'dont-care-conditions', 'adders-and-subtractors'],
  },
];
