# Data Science Code Snippets Library

## Snippet 1: Model Evaluation

```python
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

def evaluate_model(y_true, y_pred, labels=None):
    print(classification_report(y_true, y_pred, target_names=labels))
    cm = confusion_matrix(y_true, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.show()
```

## Snippet 2: Data Preprocessing

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(df):
    # Handle missing values
    df.fillna(df.mean(), inplace=True)
    # Remove duplicates
    df.drop_duplicates(inplace=True)
    # Scale features
    scaler = StandardScaler()
    numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])
    return df
```

## Snippet 3: Cross-Validation

```python
from sklearn.model_selection import cross_val_score

def cv_evaluate(model, X, y, cv=5):
    scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy')
    print(f'CV Scores: {scores}')
    print(f'Mean: {scores.mean():.3f} (+/- {scores.std():.3f})')
    return scores
```

## Snippet 4: Feature Importance

```python
import pandas as pd
import matplotlib.pyplot as plt

def plot_feature_importance(model, feature_names, top_n=10):
    importance = pd.DataFrame({
        'feature': feature_names,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False).head(top_n)
    
    plt.figure(figsize=(10, 6))
    plt.barh(importance['feature'], importance['importance'])
    plt.xlabel('Importance')
    plt.title(f'Top {top_n} Feature Importances')
    plt.gca().invert_yaxis()
    plt.show()
```

## Snippet 5: Train-Test Split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
```

## Snippet 6: Grid Search

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, 30],
    'min_samples_split': [2, 5, 10]
}

grid = GridSearchCV(model, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid.fit(X_train, y_train)
print(f'Best params: {grid.best_params_}')
print(f'Best score: {grid.best_score_:.3f}')
```

## Snippet 7: Visualization

```python
import seaborn as sns
import matplotlib.pyplot as plt

# Correlation heatmap
plt.figure(figsize=(12, 8))
sns.heatmap(df.corr(), annot=True, fmt='.2f', cmap='coolwarm')
plt.title('Feature Correlation Matrix')
plt.show()
```

## Snippet 8: Time Series Plot

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(15, 6))
plt.plot(df['date'], df['value'], label='Actual')
plt.plot(df['date'], df['predicted'], label='Predicted', alpha=0.7)
plt.xlabel('Date')
plt.ylabel('Value')
plt.title('Time Series Forecast')
plt.legend()
plt.show()
```