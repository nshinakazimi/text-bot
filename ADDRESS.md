# OPTIONAL Question: 🗺️ Address

There are a lot of places in our Angular application where we need to ask the user for a physical address such as this one:

*Example Address*

```javascript
123 Main St
New York, NY 18814
```

In order to add an address field to many parts of our application to minimize code duplication, you would:
- Build a reusable address form component
- Possibly use an API or library to help with address validation / autocomplete
- Properly organize address logic/formatting/validation
- Include tests, etc.

## We will use the address control like this

```javascript
export class AppComponent {

	mainForm = new FormGroup({
		accept: new FormControl(), // true; false;
		address: new FormControl()
 	})
    }
}


----app-component.html
<form [formGroup]="mainForm">
    <mat-checkbox [formControlName]="accept"></mat-checkbox>
    <app-address [formControlName]="address"></app-address>
</form>
```

## 🤔⁉️ Question

How will your component interact with parent form groups? How will it share data with them? Please include detailed information about this.

## 🫵 Write your answer here

The address component will interact with parent form groups through Angular's ControlValueAccessor interface and FormControl integration. Here's a detailed explanation:

### 1. Component Structure and Interface

The address component will implement the ControlValueAccessor interface, which requires four key methods:
- `writeValue(value: any)`: Called when the parent form wants to update the value
- `registerOnChange(fn: any)`: Called to register a callback for when the value changes
- `registerOnTouched(fn: any)`: Called to register a callback for when the control is touched
- `setDisabledState(isDisabled: boolean)`: Called when the control's disabled state changes

### 2. Data Flow

#### Parent to Child:
- The parent form group passes the address value through the FormControl
- The component receives updates via `writeValue()`
- The component will update its internal form state to reflect the new value
- The component will maintain its own internal FormGroup for managing the address fields

#### Child to Parent:
- When the address changes internally, the component will call the registered onChange callback
- This updates the parent form's value
- The component will emit validation state changes to the parent form

### 3. Form Integration

The component will:
- Register itself as a form control using NG_VALUE_ACCESSOR
- Provide a custom validator for address validation
- Handle both template-driven and reactive form approaches
- Support form state synchronization (pristine/dirty, touched/untouched)

### 4. Data Structure

The address data will be structured as:
```typescript
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  // Additional fields as needed
}
```

### 5. Validation and Error Handling

- The component will implement custom validators for address fields
- Validation errors will be propagated to the parent form
- The component will handle both synchronous and asynchronous validation
- Address format validation will be consistent across the application

### 6. State Management

- The component will maintain its own internal state
- State changes will be synchronized with the parent form
- The component will handle loading and error states
- Address autocomplete suggestions will be managed internally

### 7. Accessibility and UX

- The component will maintain proper ARIA attributes
- Keyboard navigation will be supported
- Error messages will be properly associated with fields
- The component will support both required and optional states

### 8. Testing Considerations

- Unit tests will verify form control integration
- Integration tests will check parent-child communication
- E2E tests will validate the complete address entry flow
- Tests will cover various address formats and validation scenarios

This implementation ensures that the address component is:
- Reusable across the application
- Consistent in behavior and validation
- Properly integrated with Angular's form system
- Maintainable and testable
- Accessible and user-friendly

## 🧐️ FAQs

### Do I have to write any code for the question above?

No need to write code. Just a detailed answer is all we're looking for.
