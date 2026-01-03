import type { Metadata } from "next";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Snippets",
  description: "Useful code snippets for data science and machine learning.",
};

const SNIPPETS = [
  {
    id: "pandas-cheatsheet",
    title: "Pandas DataFrame Cheatsheet",
    description: "Common Pandas operations for data manipulation and analysis.",
    language: "python",
    code: `import pandas as pd

# Read data
df = pd.read_csv('data.csv')

# Basic info
df.head()
df.info()
df.describe()

# Filter rows
df[df['column'] > value]
df.query('column > @value')

# Group by
df.groupby('category').agg({'value': ['mean', 'sum']})`,
  },
  {
    id: "sklearn-pipeline",
    title: "Scikit-learn ML Pipeline",
    description:
      "Basic machine learning pipeline with preprocessing and model training.",
    language: "python",
    code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier())
])

# Train
X_train, X_test, y_train, y_test = train_test_split(X, y)
pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)`,
  },
  {
    id: "matplotlib-template",
    title: "Matplotlib Plot Template",
    description: "Professional-looking plot template for data visualization.",
    language: "python",
    code: `import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 6))
plt.style.use('seaborn-v0_8-whitegrid')

plt.plot(x, y, marker='o', linewidth=2, color='#2563eb')
plt.fill_between(x, y, alpha=0.3)

plt.title('Chart Title', fontsize=14, fontweight='bold')
plt.xlabel('X Label')
plt.ylabel('Y Label')
plt.tight_layout()
plt.savefig('plot.png', dpi=300, bbox_inches='tight')`,
  },
  {
    id: "sql-aggregation",
    title: "SQL Aggregation Queries",
    description: "Common SQL patterns for data aggregation and analysis.",
    language: "sql",
    code: `-- Basic aggregation with window functions
SELECT 
    category,
    date,
    value,
    SUM(value) OVER (PARTITION BY category ORDER BY date) as running_total,
    AVG(value) OVER (PARTITION BY category) as category_avg,
    RANK() OVER (PARTITION BY category ORDER BY value DESC) as rank
FROM sales
WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);`,
  },
  {
    id: "eda-template",
    title: "EDA Quick Template",
    description: "Quick exploratory data analysis template for new datasets.",
    language: "python",
    code: `import pandas as pd
import numpy as np

# Load and explore
df = pd.read_csv('data.csv')
print(f"Shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")
print(f"Missing values:\\n{df.isnull().sum()}")
print(f"Duplicates: {df.duplicated().sum()}")

# Data types
print(df.dtypes)

# Numeric summary
print(df.describe())

# Categorical summary
for col in df.select_dtypes(include='object').columns:
    print(f"{col}: {df[col].nunique()} unique values")`,
  },
  {
    id: "model-evaluation",
    title: "Model Evaluation Metrics",
    description: "Comprehensive model evaluation for classification problems.",
    language: "python",
    code: `from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, confusion_matrix, classification_report
)

# All metrics at once
print(classification_report(y_true, y_pred))

# Individual metrics
accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred, average='weighted')
recall = recall_score(y_true, y_pred, average='weighted')
f1 = f1_score(y_true, y_pred, average='weighted')

# Confusion matrix
cm = confusion_matrix(y_true, y_pred)`,
  },
];

export default function SnippetsPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Snippets</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <Separator />

      <div className="space-y-6 p-4">
        {SNIPPETS.map((snippet) => (
          <div
            key={snippet.id}
            className="overflow-hidden rounded-lg border border-edge"
          >
            <div className="border-b border-edge bg-accent/30 p-4">
              <h2 className="font-semibold">{snippet.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {snippet.description}
              </p>
              <span className="mt-2 inline-block rounded bg-accent px-2 py-0.5 font-mono text-xs uppercase">
                {snippet.language}
              </span>
            </div>
            <pre className="overflow-x-auto bg-zinc-950 p-4 text-sm text-zinc-100">
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
