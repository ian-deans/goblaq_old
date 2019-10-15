export const initialState: ReducerState = {
  currentForm: "business",
  form: {},
  logoUrl: "",
  error: {},
  success: {},
  loading: false,
  uploadState: "none",
  uploadPercent: 0,
  uploaded: false,
  signupComplete: false,
};

export const reducer = (
  state: ReducerState = initialState,
  action: Action
): ReducerState => {
  switch (action.type) {
    case "set_current_form":
      return {
        ...state,
        form: {},
        error: {},
        currentForm: action.payload.currentForm,
      };

    case "update_field": {
      return {
        ...state,
        form: { ...action.payload.form },
      };
    }

    case "set_logo_url": {
      return {
        ...state,
        logoUrl: action.payload.logoUrl,
      };
    }

    case "clear_form": {
      return {
        ...state,
        form: {},
      };
    }

    case "set_error": {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case "set_loading": {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case "set_upload_state": {
      return {
        ...state,
        uploadState: action.payload.uploadState,
      };
    }

    case "set_upload_percent": {
      return {
        ...state,
        uploadPercent: action.payload.uploadPercent,
      };
    }
  }
};

export const actions = {
  clearForm: (): Action => ({ type: "clear_form" }),

  setUploadState: (uploadState: string): Action => ({
    type: "set_upload_state",
    payload: { uploadState },
  }),

  setUploadPercent: (uploadPercent: number): Action => ({
    type: "set_upload_percent",
    payload: { uploadPercent },
  }),

  setUploaded: (uploaded: boolean): Action => ({
    type: "set_uploaded",
    payload: { uploaded },
  }),

  setLoading: (loading: boolean): Action => ({
    type: "set_loading",
    payload: { loading },
  }),

  setLogoUrl: (logoUrl: string): Action => ({
    type: "set_logo_url",
    payload: { logoUrl },
  }),

  setCurrentForm: (currentForm: string): Action => ({
    type: "set_current_form",
    payload: { currentForm },
  }),

  setError: (error: object): Action => ({
    type: "set_error",
    payload: { error },
  }),

  updateField: (form: object): Action => ({
    type: "update_field",
    payload: { form },
  }),
};

type Action = {
  type: string;
  payload?: any;
};

type ReducerState = {
  currentForm: string;
  form: object;
  logoUrl: string;
  error: object;
  success: object;
  loading: boolean;
  uploadState: string;
  uploadPercent: number;
  uploaded: boolean;
  signupComplete: boolean;
};