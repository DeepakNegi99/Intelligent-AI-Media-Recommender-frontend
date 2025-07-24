import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot, $getSelection } from "lexical";
import { Box, Typography } from "@mui/material";
// import { ToolbarPlugin } from "@lexical/react/LexicalToolbarPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
// import { ImagePlugin } from "@lexical/react/LexicalImagePlugin";
import "./lexical-editor.css"; // Create this CSS file for styling

const theme = {
  // You can customize the theme here if needed
};

function Placeholder() {
  return <div className="editor-placeholder">Enter poll description...</div>;
}

function LexicalErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const Polls: React.FC = () => {
  const initialConfig = {
    namespace: "PollsEditor",
    theme,
    onError(error: Error) {
      throw error;
    },
    // Add nodes for images, links, lists, etc.
    nodes: [],
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "40px auto" }}>
      <Typography variant="h5" gutterBottom>
        Create a Poll
      </Typography>
      <LexicalComposer initialConfig={initialConfig}>
        {/* Toolbar for bold, italic, underline, lists, links, images, etc. */}
        {/* You can implement your own toolbar here if needed */}
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <AutoLinkPlugin matchers={[]} />
        {/* <ImagePlugin /> */}
        <OnChangePlugin
          onChange={editorState => {
            // You can handle editor state changes here if needed
          }}
        />
      </LexicalComposer>
    </Box>
  );
};

export default Polls;