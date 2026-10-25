export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';

export interface VisualExplanation {
  diagramType: 'mermaid' | 'flow' | 'json_diff' | 'tree' | 'architecture' | 'custom';
  caption: string;
  mermaidCode?: string;
  svgCode?: string;
  beforeAfter?: {
    beforeTitle: string;
    beforeData: any;
    afterTitle: string;
    afterData: any;
  };
}

export interface WorkedExample {
  scenario: string;
  inputJson: any;
  transformationLogic: string;
  outputJson: any;
  explanation: string;
}

export interface LabStep {
  stepNumber: number;
  title: string;
  instruction: string;
  nodeName?: string;
  codeSnippet?: string;
  tip?: string;
}

export interface StepByStepLab {
  title: string;
  goal: string;
  steps: LabStep[];
  expectedResult: string;
  sampleInput?: any;
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  correction: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticalChallenge {
  prompt: string;
  hints: string[];
  solutionNotes: string;
}

export interface DocLink {
  title: string;
  url: string;
  note: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  stageId: string;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  prerequisites: string[];
  whyItMatters: string;
  relatableProblem: string;
  firstPrinciplesExplanation: string;
  visualExplanation: VisualExplanation;
  secondaryVisual?: VisualExplanation;
  technicalDetails: string;
  workedExample: WorkedExample;
  stepByStepLab: StepByStepLab;
  commonMistakes: CommonMistake[];
  knowledgeCheck: QuizQuestion[];
  practicalChallenge: PracticalChallenge;
  keyTakeaways: string[];
  officialDocLinks: DocLink[];
}

export interface Module {
  id: string;
  number: number;
  stageId: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  lessons: Lesson[];
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  accentColor: string;
  modules: Module[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  stage: string;
  estimatedHours: number;
  problemStatement: string;
  businessValue: string;
  prerequisites: string[];
  architectureDiagramMermaid: string;
  requiredIntegrations: string[];
  credentialRequirements: string[];
  nodeByNodeSteps: { nodeName: string; purpose: string; config: string }[];
  sampleData: any;
  expectedOutput: any;
  workflowJson: any;
  testingInstructions: string[];
  failureCases: { symptom: string; cause: string; fix: string }[];
  securityNotes: string[];
  extensionChallenges: string[];
  definitionOfDone: string[];
}

export interface TroubleshootingCase {
  id: string;
  category: 'HTTP & APIs' | 'Expressions & Data' | 'Execution & Memory' | 'Webhooks & Network' | 'Credentials & Auth' | 'AI & LLM Nodes';
  symptom: string;
  errorCode?: string;
  rootCause: string;
  diagnosticSteps: string[];
  concreteFix: string;
  codeOrExpressionFix?: string;
  preventativeMeasures: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'Core Concepts' | 'Data & JSON' | 'Flow & Logic' | 'Protocols & APIs' | 'AI & LLMs' | 'DevOps & Infrastructure';
  plainEnglishDefinition: string;
  technicalDefinition: string;
  n8nContext: string;
  relatedTerms: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Checklists' | 'Templates' | 'Cheat Sheets' | 'Sample Data' | 'Workflows';
  description: string;
  content: string;
  downloadFilename?: string;
  downloadData?: any;
}
