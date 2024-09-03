import Wrapper from "@/components/shared/Wrapper";
import React, { useState } from "react";

const WritePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    slug: "",
    category: "",
  });

  return (
    <Wrapper>
      <div></div>
    </Wrapper>
  );
};

export default WritePost;
