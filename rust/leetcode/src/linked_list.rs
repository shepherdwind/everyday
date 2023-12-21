#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
  pub val: i32,
  pub next: Option<Box<ListNode>>
}

impl ListNode {
  #[inline]
  fn new(val: i32) -> Self {
    ListNode {
      next: None,
      val
    }
  }
}

pub struct Solution {}

impl Solution {
    pub fn reverse_between(head: Option<Box<ListNode>>, left: i32, right: i32) -> Option<Box<ListNode>> {
        let mut tmp = ListNode { val: -1, next: head };
        let mut index = 0;
        let mut left_pointer = &mut tmp.next;
        while index < left {
            index = index + 1;
            left_pointer = &mut left_pointer.as_mut()?.next; 
        }
        let mut current = left_pointer.as_mut()?.next.take();
        // let next = current?.next.take();
        while index < right {
          index += 1;
          // left = next
          left_pointer.as_mut()?.next = current?.next.take();
        }
        None
    }
}
// add test for Solution
#[cfg(test)]
mod tests {
    use super::*;
    // create ListNode from Vec
    fn create_list_node(v: Vec<i32>) -> Option<Box<ListNode>> {
        let mut head = None;
        for i in v.iter().rev() {
            let mut node = ListNode::new(*i);
            node.next = head;
            head = Some(Box::new(node));
        }
        head
    }

    fn print_list(list: &Option<Box<ListNode>>) {
        let mut list_ref = list;
        loop {
            if list_ref.is_none() {
                break;
            }
            let node = list_ref.as_ref().unwrap();
            print!("{} ", node.val);
            list_ref = &node.next;
        }
        print!("end\n")
    }

    #[test]
    fn test() {
        let node = create_list_node(vec![1, 2, 3, 4, 5]);
        print_list(&node);

        let rev_node = Solution::reverse_between(node, 2, 4);
        print_list(&rev_node);
        // assert_eq!(, create_list_node(vec![1, 4, 3, 2, 5]));
    }
}

