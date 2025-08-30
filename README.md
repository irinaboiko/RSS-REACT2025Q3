# RSS React App: Performance

## Getting Started

Ensure you have the following installed on your machine:

- [**Node.js**](https://nodejs.org/) (v20 and later)
- [**npm**](https://www.npmjs.com/)

## Installation

Clone the repository and install the dependencies:

`git clone git@github.com:irinaboiko/RSS-REACT2025Q3.git`

`git checkout performance`

`npm install`

## Running the App in Development

To start the development server:

`npm run dev`

## Code Quality

### Linting

Run ESLint to check for code issues:

`npm run lint`

### Formatting

Run Prettier to auto-format your code:

`npm run format:fix`

# Performance Profiling

## 1. Testing Scenario: Selecting a year (2023 -> 2018)

|                 | Before optimization | After optimization |
|-----------------|---------------------|--------------------|
| Commit Duration | 3s                  |                    |
| Render Duration | 152.8ms             |                    |

**Interactions**: Not recorded. In React 18, DevTools doesn’t capture interaction traces, so the panel is empty. The analysis was based on Commit/Render Duration, Flame Graph, and Ranked Chart.

#### Flame Graph - Before optimization:
![](public/performance/fg-1-not-opt.png)

#### Flame Graph - After optimization:
![]()

#### Ranked Chart - Before optimization:
![](public/performance/rc-1-not-opt.png)

#### Ranked Chart - After optimization:
![]()

## 2. Testing Scenario: Searching a country ("" -> "Austria")

|                 | Before optimization | After optimization |
|-----------------|---------------------|--------------------|
| Commit Duration | 2.2s                |                    |
| Render Duration | 162.2ms             |                    |

**Interactions**: Not recorded. In React 18, DevTools doesn’t capture interaction traces, so the panel is empty. The analysis was based on Commit/Render Duration, Flame Graph, and Ranked Chart.

#### Flame Graph - Before optimization:
![](public/performance/fg-2-not-opt.png)

#### Flame Graph - After optimization:
![]()

#### Ranked Chart - Before optimization:
![](public/performance/rc-2-not-opt.png)

#### Ranked Chart - After optimization:
![]()

## 3. Testing Scenario: Sorting the `Name` column (`"asc"` -> `"desc"`)

|                 | Before optimization | After optimization |
|-----------------|---------------------|--------------------|
| Commit Duration | 1.5s                |                    |
| Render Duration | 183.3ms             |                    |

**Interactions**: Not recorded. In React 18, DevTools doesn’t capture interaction traces, so the panel is empty. The analysis was based on Commit/Render Duration, Flame Graph, and Ranked Chart.

#### Flame Graph - Before optimization:
![](public/performance/fg-3-not-opt.png)

#### Flame Graph - After optimization:
![]()

#### Ranked Chart - Before optimization:
![](public/performance/rc-3-not-opt.png)

#### Ranked Chart - After optimization:
![]()

## 4. Testing Scenario: Adding additional columns (`Methane`, `Oil CO₂`, `Gas CO₂`, `Temperature change from CO₂`)

|                 | Before optimization | After optimization |
|-----------------|---------------------|--------------------|
| Commit Duration | 1.2s                |                    |
| Render Duration | 6.3ms               |                    |

**Interactions**: Not recorded. In React 18, DevTools doesn’t capture interaction traces, so the panel is empty. The analysis was based on Commit/Render Duration, Flame Graph, and Ranked Chart.

#### Flame Graph - Before optimization:
![](public/performance/fg-4-not-opt.png)

#### Flame Graph - After optimization:
![]()

#### Ranked Chart - Before optimization:
![](public/performance/rc-4-not-opt.png)

#### Ranked Chart - After optimization:
![]()
