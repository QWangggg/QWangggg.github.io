import React, { useState, useEffect } from 'react';
import {
  Typography,
  Row,
  Col,
  Input,
  Button,
  Space,
  Divider,
  Tooltip,
} from 'antd';
import {
  SaveOutlined,
  DownloadOutlined,
  CopyOutlined,
  DeleteOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './index.less';

const { Title, Text } = Typography;
const { TextArea } = Input;

const WritingPage: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    '# 开始写作\n\n这是一个 Markdown 编辑器，你可以在这里开始你的写作之旅。\n\n## 基本语法\n\n- **粗体** 或者 __粗体__\n- *斜体* 或者 _斜体_\n- ~~删除线~~\n\n## 代码\n\n```javascript\nfunction hello() {\n  console.log("Hello, World!");\n}\n```\n\n## 链接和图片\n\n[链接文字](https://example.com)\n\n![图片描述](https://via.placeholder.com/150)\n\n## 表格\n\n| 表头 1 | 表头 2 |\n| ------ | ------ |\n| 单元格 1 | 单元格 2 |\n| 单元格 3 | 单元格 4 |',
  );

  const [savedMarkdown, setSavedMarkdown] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Load saved content from localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('markdownContent');
    if (savedContent) {
      setMarkdown(savedContent);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('markdownContent', markdown);
    setIsSaved(true);

    // Add to saved list if not empty
    if (markdown.trim() !== '') {
      const title = extractTitle(markdown);
      const newSaved = [...savedMarkdown];
      if (!newSaved.includes(title)) {
        newSaved.push(title);
        setSavedMarkdown(newSaved);
      }
    }

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleClear = () => {
    if (window.confirm('确定要清空编辑器内容吗？')) {
      setMarkdown('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${extractTitle(markdown) || 'untitled'}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const extractTitle = (text: string): string => {
    const match = text.match(/^#\s+(.+)$/m);
    return match ? match[1] : '未命名文档';
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    const beforeText = markdown.substring(0, start);
    const afterText = markdown.substring(end);

    const newText = beforeText + prefix + selectedText + suffix + afterText;
    setMarkdown(newText);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length,
      );
    }, 0);
  };

  return (
    <div className={styles.writingContainer}>
      <div className={styles.header}>
        <Title level={2}>即刻写作</Title>
        <Text type="secondary">使用 Markdown 创建和编辑你的文档</Text>
      </div>

      <div className={styles.toolbar}>
        <Space size="middle">
          <Tooltip title="保存">
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              {isSaved ? '已保存' : '保存'}
            </Button>
          </Tooltip>
          <Tooltip title="下载 Markdown 文件">
            <Button icon={<DownloadOutlined />} onClick={handleDownload}>
              下载
            </Button>
          </Tooltip>
          <Tooltip title="复制全部">
            <Button icon={<CopyOutlined />} onClick={handleCopy}>
              复制
            </Button>
          </Tooltip>
          <Tooltip title="清空编辑器">
            <Button danger icon={<DeleteOutlined />} onClick={handleClear}>
              清空
            </Button>
          </Tooltip>
        </Space>

        <Divider type="vertical" />

        <Space size="small">
          <Tooltip title="粗体">
            <Button
              icon={<BoldOutlined />}
              onClick={() => insertMarkdown('**', '**')}
            />
          </Tooltip>
          <Tooltip title="斜体">
            <Button
              icon={<ItalicOutlined />}
              onClick={() => insertMarkdown('*', '*')}
            />
          </Tooltip>
          <Tooltip title="有序列表">
            <Button
              icon={<OrderedListOutlined />}
              onClick={() => insertMarkdown('\n1. ')}
            />
          </Tooltip>
          <Tooltip title="无序列表">
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() => insertMarkdown('\n- ')}
            />
          </Tooltip>
          <Tooltip title="链接">
            <Button
              icon={<LinkOutlined />}
              onClick={() => insertMarkdown('[链接文字](', ')')}
            />
          </Tooltip>
          <Tooltip title="图片">
            <Button
              icon={<PictureOutlined />}
              onClick={() => insertMarkdown('![图片描述](', ')')}
            />
          </Tooltip>
          <Tooltip title="代码块">
            <Button
              icon={<CodeOutlined />}
              onClick={() => insertMarkdown('\n```\n', '\n```')}
            />
          </Tooltip>
        </Space>
      </div>

      <Row gutter={24} className={styles.editorContainer}>
        <Col xs={24} md={12} className={styles.editorCol}>
          <div className={styles.editorHeader}>
            <Text strong>编辑</Text>
          </div>
          <TextArea
            className={styles.editor}
            value={markdown}
            onChange={handleChange}
            autoSize={{ minRows: 30, maxRows: 30 }}
            placeholder="在这里输入 Markdown 内容..."
          />
        </Col>
        <Col xs={24} md={12} className={styles.previewCol}>
          <div className={styles.previewHeader}>
            <Text strong>预览</Text>
          </div>
          <div className={styles.preview}>
            <div
              dangerouslySetInnerHTML={{
                __html: renderMarkdownSimple(markdown),
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

function renderMarkdownSimple(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Strike through
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
    // Images
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />');

  // Handle lists - first convert to temporary markers
  html = html
    .replace(/^(\s*)\d+\.\s+(.*$)/gm, '$1<li>$2</li>')
    .replace(/^(\s*)[-*+]\s+(.*$)/gm, '$1<li>$2</li>');

  // Wrap adjacent list items in ul/ol tags
  let inList = false;
  let listLines = html.split('\n');
  let result = [];

  for (let i = 0; i < listLines.length; i++) {
    const line = listLines[i];
    if (line.trim().startsWith('<li>')) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(line);
    } else {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push(line);
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  html = result.join('\n');

  // Add line breaks within paragraphs but preserve other block level elements
  let lines = html.split('\n');
  let inParagraph = false;
  let final = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') {
      final.push(line);
      inParagraph = false;
    } else if (
      line.startsWith('<h') ||
      line.startsWith('<pre') ||
      line.startsWith('<ul') ||
      line.startsWith('</ul') ||
      line.startsWith('<li') ||
      line.startsWith('<img')
    ) {
      final.push(line);
      inParagraph = false;
    } else {
      if (!inParagraph) {
        final.push('<p>' + line);
        inParagraph = true;
      } else {
        final.push('<br />' + line);
      }
    }
  }

  if (inParagraph) {
    final.push('</p>');
  }

  return final.join('\n');
}

export default WritingPage;
