//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace shopOne.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_product_attribute
    {
        public int pkID { get; set; }
        public int FKproduct_ID { get; set; }
        public int FKattribute_ID { get; set; }
        public int FKvalue_ID { get; set; }
    
        public virtual tbl_attribute_values tbl_attribute_values { get; set; }
        public virtual tbl_attributes tbl_attributes { get; set; }
        public virtual tbl_products tbl_products { get; set; }
    }
}